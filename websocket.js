// websocket.js
// KHÔNG tự chạy khi require – chỉ export hàm ensure + API dùng chung

const http = require('http');
const WebSocket = require('ws');
const { WebSocketServer } = require('ws');
const { Client, Collection, GatewayIntentBits, ContainerBuilder, TextDisplayBuilder, MessageFlags } = require('discord.js');

const { randomUUID } = require('crypto');
const url = require('url');
const game = require('./3-model/game');// <-- import game object
const { hasRoleByTag } = require('./roles');// <-- import hàm hasRoleByTag
const { addTag } = require('./utils'); // <-- import hàm addTag
const vtumons = require('./3-model/vtumon');
const items = require('./3-model/item');

const DEFAULT_PORT = 6886;

function ensureWebSocket(port = DEFAULT_PORT) {
  // Dùng biến global để tránh tạo lại khi module được require nhiều lần
  if (globalThis.__OGRE_WSS__) return globalThis.__OGRE_WSS__;

  const server = http.createServer();
  const wss = new WebSocketServer({ server });
  const clients = new Map();

  const serverBroadcast = (message) => {
    wss.clients.forEach((ws) => {
      if (ws.readyState === WebSocket.OPEN) ws.send(message);
    });
  };

  wss.on('connection', (connection, request) => {
    const { username } = url.parse(request.url, true).query; // nếu cần
    const uuid = randomUUID();
    clients.set(connection, uuid);
    console.log(`new connection assigned id: ${uuid}`);

    connection.on('message', (msg) => {
      try {
        const data = JSON.parse(msg);
        console.log('data', data);
        let vtumonList
        let itemList
        switch (data.action) {
          case 'notify':
            try {
              if (global.set_trainer_interaction) {

                let str = `Vtumon channel thông báo: \n`
                str += data.message
                const containerComponent = new ContainerBuilder()
                  .addTextDisplayComponents(
                    new TextDisplayBuilder().setContent(str)
                  );
                global.set_trainer_interaction.message.channel.send({
                  flags: MessageFlags.IsComponentsV2,
                  components: [containerComponent]
                });
              }
            } catch (error) {

            }

            break;
          /** use
            * @param {string} action - Loại thao tác (type)
            * @param {number|int} player_id - Player số 1 hay 2
            * @param {string} type - Loại sử dụng
            * @param {string} type_id - tên sử dụng
          */
          case 'set_state':
            if (data.type == 'item') {
              try {
                switch (data.player_id) {
                  case 1:
                    // console.log(items.markItemUsed(game.player1.items, data.type_id))
                    game.player1.items = items.markItemUsed(game.player1.items, data.type_id, data.state)
                    break;
                  case 2:
                    // console.log(items.markItemUsed(game.player2.items, data.type_id))
                    game.player2.items = items.markItemUsed(game.player2.items, data.type_id, data.state)
                    break;
                  default:
                    break;
                }
              } catch (error) {

              }
            }
            break;
          /** set_turn
            * @param {string} action - Loại thao tác (type)
            * @param {number|int} player_id - Player số 1 hay 2
          */
          case 'set_turn':
            game.setTurn(data.player_id)
            console.log('game.turn : ', game.turn)
            break;
          /** ue_set_trainer
            * @param {string} action - Loại thao tác (type)
            * @param {number|int} player_id - Player số 1 hay 2
            * @param {string array|} vtumons - Chứa list tên vtumon
            * @param {string array|} items - Chứa list tên item
          */
          case 'ue_set_trainer':
            switch (data.player_id) {
              case 1:
                vtumonList = vtumons.getVtumonsFromNames(data.vtumons);
                itemList = items.getItemsByNames(data.items);
                game.setPlayer1(game.player1.id, itemList, vtumonList);
                // console.log(game.player1)
                if (global.set_trainer_interaction) {
                  let str = `Trainer ${addTag(game.player1.id)}:\n`
                  str += `- Vtumons:\n`
                  str += `${game.player1.vtumons.map(v => `  ${v.name} [${v.elements[0]}, ${v.elements[1]}]\n`).join('')}`
                  str += `- Items:\n`
                  str += `${game.player1.items.map(i => `  ${i.name} \n`).join('')}\n`
                  const containerComponent = new ContainerBuilder()
                    .addTextDisplayComponents(
                      new TextDisplayBuilder().setContent(str)
                    );
                  global.set_trainer_interaction.message.channel.send({
                    flags: MessageFlags.IsComponentsV2,
                    components: [containerComponent]
                  });
                }
                break;
              case 2:
                vtumonList = vtumons.getVtumonsFromNames(data.vtumons);
                itemList = items.getItemsByNames(data.items);
                game.setPlayer2(game.player2.id, itemList, vtumonList);
                try {
                  if (global.set_trainer_interaction) {
                    let str = `Trainer ${addTag(game.player2.id)}:\n`
                    str += `- Vtumons:\n`
                    str += `${game.player2.vtumons.map(v => `  ${v.name} [${v.elements[0]}, ${v.elements[1]}]\n`).join('')}`
                    str += `- Items:\n`
                    // str += `${game.player2.items.map(i => `  ${i.name} (${i.used ? 'Đã dùng' : 'Chưa dùng'}) \n`).join('')}\n`
                    str += `${game.player2.items.map(i => `  ${i.name} \n`).join('')}\n`
                    const containerComponent = new ContainerBuilder()
                      .addTextDisplayComponents(
                        new TextDisplayBuilder().setContent(str)
                      );
                    global.set_trainer_interaction.message.channel.send({
                      flags: MessageFlags.IsComponentsV2,
                      components: [containerComponent]
                    });
                  }
                } catch (error) {

                }

                break;
              default:
                break;
            }
            break;

          default:
            break;
        }
        // console.log(`received: ${msg}`);
        // serverBroadcast(`Client ${clients.get(connection)} ${msg}`);
      } catch (e) {
        // bỏ qua message không phải JSON
      }
    });

    connection.on('close', () => {
      console.log(`connection (id = ${clients.get(connection)}) closed`);
      clients.delete(connection);
    });

    connection.send(`You have been assigned id ${uuid}`);
  });

  // const interval = setInterval(() => {
  //   console.log(`Number of connected clients: ${clients.size}`);
  //   // serverBroadcast(`Number of connected clients: ${clients.size}`);
  // }, 15000);

  server.listen(port, () => {
    console.log('🟢 Websocket is running PORT ' + port);
  });

  // Dọn dẹp khi thoát (hữu ích với dev/hot-reload)
  const closeAll = () => {
    // clearInterval(interval);
    try { wss.clients.forEach((ws) => ws.terminate()); } catch { }
    try { wss.close(); } catch { }
    try { server.close(); } catch { }
    delete globalThis.__OGRE_WSS__;
  };
  process.once('SIGTERM', closeAll);
  process.once('SIGINT', closeAll);
  process.once('exit', closeAll);

  globalThis.__OGRE_WSS__ = { server, wss, clients, serverBroadcast, closeAll };
  return globalThis.__OGRE_WSS__;
}

module.exports = {
  // gọi hàm này ở entrypoint để đảm bảo đã khởi tạo (chỉ 1 lần)
  ensureWebSocket,
  // các getter này sẽ tự đảm bảo đã khởi tạo trước khi trả về
  get clients() { return ensureWebSocket().clients; },
  get wss() { return ensureWebSocket().wss; },
  serverBroadcast(message) { return ensureWebSocket().serverBroadcast(message); },
};

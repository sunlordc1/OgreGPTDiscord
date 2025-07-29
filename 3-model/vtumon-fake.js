const vtumons = [
    { id: 1, name: "Pandora Miwa", skills: ["Chập mạch", "Nhìn khinh bỉ", "Dạ dày thép", "Bản hit bùng nổ"], elements: ["Electric", "Steel"] },
    { id: 2, name: "Miwa Alter", skills: ["Cắn nhẹ", "Nhà tù tình yêu", "Nụ hôn tử thần", "Chắp cánh ước mơ"], elements: ["Flying", "Dark"] },
    { id: 3, name: "Skyes", skills: ["Bóng ma nửa đêm", "Chia ngọt sẻ bùi", "Mắt ướt", "Thô bạo"], elements: ["Ghost", "Fairy"] },
    { id: 4, name: "Mara Hekate", skills: ["Cọc cằn", "Lời vàng ngọc", "Gia nhập tầng hầm", "Cướp cạn"], elements: ["Fighting", "Psychic"] },
    { id: 5, name: "Datas102", skills: ["Gạt giò", "Đầu đất", "Chạm cỏ", "Mê mẩn"], elements: ["Grass", "Ground"] },
    { id: 6, name: "Kagami Toki", skills: ["Cái nhìn xuyên thấu", "Phong ấn thời không", "Tâm linh chi trảo", "Thời khắc tận diệt"], elements: ["Dark", "Psychic"] },
    { id: 7, name: "Mục Vũ", skills: ["Trượt tay", "Lỡ chân", "Đứa này non ác", "Cay không?"], elements: ["Psychic", "Normal"] },
    { id: 8, name: "2X", skills: ["Nồi đồng nấu ốc", "Nồi đất nấu ếch", "Bắt con cọp", "Rồng lộn"], elements: ["Dragon", "Fire"] },
    { id: 9, name: "Hakase Shoichi", skills: ["Key blade", "Play rough", "Tentacles punch", "Spectral parade"], elements: ["Ghost", "Fighting"] },
    { id: 10, name: "Sakuro Kaiya", skills: ["Neko punch", "Đẹp trai thần chưởng", "Xe đạp mèo dâu", "Dâu đẫm máu"], elements: ["Psychic", "Normal"] },
    { id: 11, name: "Ami Tenshi", skills: ["Bụi phước lành", "Dây leo phán xét", "Hoa hồng địa ngục", "Khế ước kép"], elements: ["Dark", "Fairy"] },
    { id: 12, name: "Aubrey Hanorami", skills: ["Shark teeth", "Glitch hand", "Glitch knife", "Glitch hole"], elements: ["Dark", "Psychic"] },
    { id: 13, name: "Copa Bingo", skills: ["Triệu hồi bí ngô", "Phạt cảnh cáo", "Xích lại gần nhau", "Cơn lốc màu da cam"], elements: ["Grass", "Steel"] },
    { id: 14, name: "Fuyuki Inari", skills: ["Mayone ngập đầu", "Vodka ướp lạnh", "Chó dại xuất kích", "Đóng băng tài khoản"], elements: ["Ice", "Fairy"] },
    { id: 15, name: "Hải Quỳ", skills: ["Crescent impact", "Day break illusion", "Calamity strike", "Moonlight divine"], elements: ["Fairy", "Steel"] },
    { id: 16, name: "Kronus", skills: ["Ý chí Ironus", "Hướng về nguồn cội", "Sức nặng công lý", "Vì Irunan!"], elements: ["Steel", "Water"] },
    { id: 17, name: "Xx_MayBaVuong_xX", skills: ["Tê con", "Tao cao m8", "Bắp cải nè", "Tôi cute"], elements: ["Psychic", "Normal"] },
    { id: 18, name: "Aoshima Nekojima", skills: ["Ban phát dân chủ", "Biết chơi game không?", "Hướng về nguồn cội", "Ma âm cổ chú"], elements: ["Dark", "Steel"] },
    { id: 19, name: "Bánh Trôi", skills: ["Yori-mo-a-na-ta", "Đạn đường viên", "Do bạn xui", "Stream ru ngủ"], elements: ["Psychic", "Dark"] },
    { id: 20, name: "Schnavia Glücklichkeit", skills: ["Peek a boo", "Thơm một cái", "Khóc to lên", "Tôi yêu các em"], elements: ["Ghost", "Fairy"] },
    { id: 21, name: "Sứa có Não", skills: ["Băng ngục", "Thủy lốc", "Huyết lưu thuật", "Sóng thần"], elements: ["Water", "Ice"] },
    { id: 22, name: "Suwaa Hakirin", skills: ["Star whisper", "Witching gaze", "Demon's wings", "Hex kiss"], elements: ["Fairy", "Psychic"] },
    { id: 23, name: "Sora Tatsuki", skills: ["Dino punch", "Water bullet", "Khúm núm", "Water gun"], elements: ["Water", "Fighting"] }
];

function getRandomVtumons() {
    const shuffled = [...vtumons].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
}

module.exports = {
    getRandomVtumons,
};



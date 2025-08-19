const vtumons = [
    {
        id: 1,
        name: "Pandora Miwa",
        skills: [
            {
                name: "Chập mạch",
                mana_cost: 0,
                element_name: "Electric"
            },
            {
                name: "Nhìn khinh bỉ",
                mana_cost: 1,
                element_name: "Steel"
            },
            {
                name: "Dạ dày thép",
                mana_cost: 2,
                element_name: "Steel"
            },
            {
                name: "Bản hit bùng nổ",
                mana_cost: 3,
                element_name: "Electric"
            }
        ],
        elements: [
            "Electric",
            "Steel"
        ]
    },
    {
        id: 2,
        name: "Miwa Alter",
        skills: [
            {
                name: "Cắn nhẹ",
                mana_cost: 0,
                element_name: "Flying"
            },
            {
                name: "Nhà tù tình yêu",
                mana_cost: 2,
                element_name: "Dark"
            },
            {
                name: "Nụ hôn tử thần",
                mana_cost: 2,
                element_name: "Dark"
            },
            {
                name: "Chắp cánh ước mơ",
                mana_cost: 3,
                element_name: "Flying"
            }
        ],
        elements: [
            "Flying",
            "Dark"
        ]
    },
    {
        id: 3,
        name: "Skyes",
        skills: [
            {
                name: "Bóng ma nửa đêm",
                mana_cost: 0,
                element_name: "Ghost"
            },
            {
                name: "Chia ngọt sẻ bùi",
                mana_cost: 1,
                element_name: "Fairy"
            },
            {
                name: "Mắt ướt",
                mana_cost: 2,
                element_name: "Fairy"
            },
            {
                name: "Thô bạo",
                mana_cost: 3,
                element_name: "Ghost"
            }
        ],
        elements: [
            "Ghost",
            "Fairy"
        ]
    },
    {
        id: 4,
        name: "Mara Hekate",
        skills: [
            {
                name: "Cọc cằn",
                mana_cost: 1,
                element_name: "Fighting"
            },
            {
                name: "Lời vàng ngọc",
                mana_cost: 1,
                element_name: "Psychic"
            },
            {
                name: "Gia nhập tầng hầm",
                mana_cost: 2,
                element_name: "Psychic"
            },
            {
                name: "Cướp cạn",
                mana_cost: 3,
                element_name: "Fighting"
            }
        ],
        elements: [
            "Fighting",
            "Psychic"
        ]
    },
    {
        id: 5,
        name: "Datas102",
        skills: [
            {
                name: "Gạt giò",
                mana_cost: 1,
                element_name: "Ground"
            },
            {
                name: "Đầu đất",
                mana_cost: 2,
                element_name: "Ground"
            },
            {
                name: "Chạm cỏ",
                mana_cost: 2,
                element_name: "Grass"
            },
            {
                name: "Mê mẩn",
                mana_cost: 3,
                element_name: "Grass"
            }
        ],
        elements: [
            "Grass",
            "Ground"
        ]
    },
    {
        id: 6,
        name: "Kagami Toki",
        skills: [
            {
                name: "Cái nhìn xuyên thấu",
                mana_cost: 0,
                element_name: "Dark"
            },
            {
                name: "Phong ấn thời không",
                mana_cost: 1,
                element_name: "Psychic"
            },
            {
                name: "Tâm linh chi trảo",
                mana_cost: 2,
                element_name: "Psychic"
            },
            {
                name: "Thời khắc tận diệt",
                mana_cost: 3,
                element_name: "Dark"
            }
        ],
        elements: [
            "Dark",
            "Psychic"
        ]
    },
    {
        id: 7,
        name: "Mục Vũ",
        skills: [
            {
                name: "Trượt tay",
                mana_cost: 0,
                element_name: "Normal"
            },
            {
                name: "Lỡ chân",
                mana_cost: 1,
                element_name: "Normal"
            },
            {
                name: "Đứa này non ác",
                mana_cost: 2,
                element_name: "Psychic"
            },
            {
                name: "Cay không?",
                mana_cost: 3,
                element_name: "Psychic"
            }
        ],
        elements: [
            "Psychic",
            "Normal"
        ]
    },
    {
        id: 8,
        name: "2X",
        skills: [
            {
                name: "Nồi đồng nấu ốc",
                mana_cost: 1,
                element_name: "Fire"
            },
            {
                name: "Nồi đất nấu ếch",
                mana_cost: 2,
                element_name: "Fire"
            },
            {
                name: "Bắt con cọp",
                mana_cost: 2,
                element_name: "Dragon"
            },
            {
                name: "Rồng lộn",
                mana_cost: 3,
                element_name: "Dragon"
            }
        ],
        elements: [
            "Dragon",
            "Fire"
        ]
    },
    {
        id: 9,
        name: "Hakase Shoichi",
        skills: [
            {
                name: "Key blade",
                mana_cost: 1,
                element_name: "Fighting"
            },
            {
                name: "Play rough",
                mana_cost: 2,
                element_name: "Fighting"
            },
            {
                name: "Tentacles punch",
                mana_cost: 2,
                element_name: "Ghost"
            },
            {
                name: "Spectral parade",
                mana_cost: 3,
                element_name: "Ghost"
            }
        ],
        elements: [
            "Ghost",
            "Fighting"
        ]
    },
    {
        id: 10,
        name: "Sakuro Kaiya",
        skills: [
            {
                name: "Neko punch",
                mana_cost: 1,
                element_name: "Normal"
            },
            {
                name: "Đẹp trai thần chưởng",
                mana_cost: 1,
                element_name: "Psychic"
            },
            {
                name: "Xe đạp mèo dâu",
                mana_cost: 2,
                element_name: "Psychic"
            },
            {
                name: "Dâu đẫm máu",
                mana_cost: 3,
                element_name: "Psychic"
            }
        ],
        elements: [
            "Psychic",
            "Normal"
        ]
    },
    {
        id: 11,
        name: "Ami Tenshi",
        skills: [
            {
                name: "Bụi phước lành",
                mana_cost: 1,
                element_name: "Fairy"
            },
            {
                name: "Dây leo phán xét",
                mana_cost: 2,
                element_name: "Fairy"
            },
            {
                name: "Hoa hồng địa ngục",
                mana_cost: 2,
                element_name: "Dark"
            },
            {
                name: "Khế ước kép",
                mana_cost: 3,
                element_name: "Dark"
            }
        ],
        elements: [
            "Dark",
            "Fairy"
        ]
    },
    {
        id: 12,
        name: "Aubrey Hanorami",
        skills: [
            {
                name: "Shark teeth",
                mana_cost: 1,
                element_name: "Dark"
            },
            {
                name: "Glitch hand",
                mana_cost: 1,
                element_name: "Psychic"
            },
            {
                name: "Glitch knife",
                mana_cost: 2,
                element_name: "Psychic"
            },
            {
                name: "Glitch hole",
                mana_cost: 3,
                element_name: "Dark"
            }
        ],
        elements: [
            "Dark",
            "Psychic"
        ]
    },
    {
        id: 13,
        name: "Copa Bingo",
        skills: [
            {
                name: "Triệu hồi bí ngô",
                mana_cost: 1,
                element_name: "Grass"
            },
            {
                name: "Phạt cảnh cáo",
                mana_cost: 1,
                element_name: "Steel"
            },
            {
                name: "Xích lại gần nhau",
                mana_cost: 2,
                element_name: "Steel"
            },
            {
                name: "Cơn lốc màu da cam",
                mana_cost: 3,
                element_name: "Grass"
            }
        ],
        elements: [
            "Grass",
            "Steel"
        ]
    },
    {
        id: 14,
        name: "Fuyuki Inari",
        skills: [
            {
                name: "Mayone ngập đầu",
                mana_cost: 1,
                element_name: "Fairy"
            },
            {
                name: "Vodka ướp lạnh",
                mana_cost: 1,
                element_name: "Ice"
            },
            {
                name: "Chó dại xuất kích",
                mana_cost: 2,
                element_name: "Ice"
            },
            {
                name: "Đóng băng tài khoản",
                mana_cost: 3,
                element_name: "Ice"
            }
        ],
        elements: [
            "Ice",
            "Fairy"
        ]
    },
    {
        id: 15,
        name: "Hải Quỳ",
        skills: [
            {
                name: "Crescent impact",
                mana_cost: 1,
                element_name: "Steel"
            },
            {
                name: "Day break illusion",
                mana_cost: 2,
                element_name: "Fairy"
            },
            {
                name: "Calamity strike",
                mana_cost: 3,
                element_name: "Steel"
            },
            {
                name: "Moonlight divine",
                mana_cost: 3,
                element_name: "Fairy"
            }
        ],
        elements: [
            "Fairy",
            "Steel"
        ]
    },
    {
        id: 16,
        name: "Kronus",
        skills: [
            {
                name: "Ý chí Ironus",
                mana_cost: 1,
                element_name: "Water"
            },
            {
                name: "Hướng về nguồn cội",
                mana_cost: 2,
                element_name: "Water"
            },
            {
                name: "Sức nặng công lý",
                mana_cost: 2,
                element_name: "Steel"
            },
            {
                name: "Vì Irunan!",
                mana_cost: 3,
                element_name: "Steel"
            }
        ],
        elements: [
            "Steel",
            "Water"
        ]
    },
    {
        id: 17,
        name: "Xx_MayBaVuong_xX",
        skills: [
            {
                name: "Tê con",
                mana_cost: 1,
                element_name: "Psychic"
            },
            {
                name: "Tao cao m8",
                mana_cost: 1,
                element_name: "Normal"
            },
            {
                name: "Bắp cải nè",
                mana_cost: 2,
                element_name: "Normal"
            },
            {
                name: "Tôi cute",
                mana_cost: 3,
                element_name: "Psychic"
            }
        ],
        elements: [
            "Psychic",
            "Normal"
        ]
    },
    {
        id: 18,
        name: "Aoshima Nekojima",
        skills: [
            {
                name: "Ban phát dân chủ",
                mana_cost: 0,
                element_name: "Steel"
            },
            {
                name: "Biết chơi game không?",
                mana_cost: 1,
                element_name: "Steel"
            },
            {
                name: "Hướng về nguồn cội",
                mana_cost: 2,
                element_name: "Dark"
            },
            {
                name: "Ma âm cổ chú",
                mana_cost: 3,
                element_name: "Dark"
            }
        ],
        elements: [
            "Dark",
            "Steel"
        ]
    },
    {
        id: 19,
        name: "Bánh Trôi",
        skills: [
            {
                name: "Yori-mo-a-na-ta",
                mana_cost: 1,
                element_name: "Psychic"
            },
            {
                name: "Đạn đường viên",
                mana_cost: 1,
                element_name: "Dark"
            },
            {
                name: "Do bạn xui",
                mana_cost: 2,
                element_name: "Dark"
            },
            {
                name: "Stream ru ngủ",
                mana_cost: 3,
                element_name: "Psychic"
            }
        ],
        elements: [
            "Psychic",
            "Dark"
        ]
    },
    {
        id: 20,
        name: "Schnavia Glücklichkeit",
        skills: [
            {
                name: "Peek a boo",
                mana_cost: 1,
                element_name: "Ghost"
            },
            {
                name: "Thơm một cái",
                mana_cost: 2,
                element_name: "Fairy"
            },
            {
                name: "Khóc to lên",
                mana_cost: 3,
                element_name: "Fairy"
            },
            {
                name: "Tôi yêu các em",
                mana_cost: 3,
                element_name: "Ghost"
            }
        ],
        elements: [
            "Ghost",
            "Fairy"
        ]
    },
    {
        id: 21,
        name: "Sứa có Não",
        skills: [
            {
                name: "Băng ngục",
                mana_cost: 1,
                element_name: "Ice"
            },
            {
                name: "Thủy lốc",
                mana_cost: 1,
                element_name: "Water"
            },
            {
                name: "Huyết lưu thuật",
                mana_cost: 2,
                element_name: "Water"
            },
            {
                name: "Sóng thần",
                mana_cost: 3,
                element_name: "Water"
            }
        ],
        elements: [
            "Water",
            "Ice"
        ]
    },
    {
        id: 22,
        name: "Suwaa Hakirin",
        skills: [
            {
                name: "Star whisper",
                mana_cost: 1,
                element_name: "Fairy"
            },
            {
                name: "Witching gaze",
                mana_cost: 1,
                element_name: "Psychic"
            },
            {
                name: "Demon's wings",
                mana_cost: 2,
                element_name: "Psychic"
            },
            {
                name: "Hex kiss",
                mana_cost: 3,
                element_name: "Fairy"
            }
        ],
        elements: [
            "Fairy",
            "Psychic"
        ]
    },
    {
        id: 23,
        name: "Sora Tatsuki",
        skills: [
            {
                name: "Dino punch",
                mana_cost: 1,
                element_name: "Fighting"
            },
            {
                name: "Water bullet",
                mana_cost: 1,
                element_name: "Water"
            },
            {
                name: "Khúm núm",
                mana_cost: 2,
                element_name: "Water"
            },
            {
                name: "Water gun",
                mana_cost: 3,
                element_name: "Water"
            }
        ],
        elements: [
            "Water",
            "Fighting"
        ]
    }
]
function transformSkills(vtumons, elements) {
    return vtumons.map(v => ({
        ...v,
        skills: v.skills.map(skillName => ({
            name: skillName,
            mana_cost: Math.floor(Math.random() * 4), // 0 đến 3
            nguyên_tố: elements[Math.floor(Math.random() * elements.length)].name
        }))
    }));
}

// 👉 Gọi hàm:

function getRandomVtumons() {
    const shuffled = [...vtumons].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
}
function findVtumonByName(name) {
    return vtumons.find(vtumon => vtumon.name.trim().toLowerCase() === name.trim().toLowerCase()) || null;
}
function getVtumonsFromNames(nameArray) {
    return nameArray
        .map(name => findVtumonByName(name))
        .filter(vtumon => vtumon !== null); // loại bỏ trường hợp không tìm thấy
}
module.exports = {
    getRandomVtumons, transformSkills, findVtumonByName, getVtumonsFromNames, vtumons
};



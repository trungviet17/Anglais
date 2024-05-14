const prompts = [
    "The quick brown fox jumps over the lazy dog.",
    "She sells sea shells by the sea shore.",
    "Betty Botter bought some butter, but she said the butter’s bitter.",
    "Tim and Sally went to the park. They saw ducks in the pond. Tim had a red ball. He threw it, and Sally caught it. The sun was bright. They had a fun day.",
    "Red leather, yellow leather.",
    "The sixth sick sheikh’s sixth sheep’s sick.",
    "Toy boat. Toy boat. Toy boat.",
    "I scream, you scream, we all scream for ice cream!",
    "Fuzzy Wuzzy was a bear. Fuzzy Wuzzy had no hair. Fuzzy Wuzzy wasn’t very fuzzy, was he?",
    "Sally sells seashells by the seashore. The shells she sells are surely seashells.",
    "She stood on the balcony, inexplicably mimicking him hiccupping, and amicably welcoming him home.",
    "I saw Susie sitting in a shoeshine shop. Where she sits she shines, and where she shines she sits.",
    "Jake and Grace visited a botanical garden. They smelled fragrant flowers. Jake brought a camera. He took pictures, and Grace admired butterflies. The garden was colorful. They felt enchanted.",
    "Ben and Mia went to a bookstore. They browsed shelves filled with books. Ben brought a notebook. He wrote, and Mia flipped pages. The bookstore was cozy. They enjoyed the atmosphere.",
    "Michael and Hannah went to a concert. They listened to live music in the park. Michael brought a blanket. They sat, and Hannah sang along. The melodies were soothing. They felt relaxed.",
    "A pair of actors rehearsed a scene from a play. They practiced their lines and worked on their character's emotions. They experimented with different interpretations of the scene until they found the perfect performance.",
    "A movie-loving duo watched a foreign film with subtitles. They listened carefully to the dialogue and discussed the plot twists.",
    "Two museum enthusiasts visited a new exhibit. They examined artifacts and read informational plaques. One person shared historical facts, and the other asked questions.",
    "A pair of students prepared for a vocabulary quiz. They created mnemonic devices to remember difficult words",
    "Actors rehearsed scenes, perfecting lines and emotions.",
    "Hikers spotted wildlife, taking photos and enjoying nature.",
    "Movie buffs watched films, discussing plots and actors.",
    "Explorers visited museums, learning and asking questions.",
    "Students prepped for quizzes, practicing and defining words.",
    "Readers discussed plots, exploring themes and characters.",
    "Writers brainstormed stories, sharing ideas and feedback.",
    "Classmates played word games, laughing at funny sentences.",
    "Family cooked, chopping and stirring, enjoying the meal.",
    "Friends studied vocab together, quizzing and explaining.",
    "Siblings played games, laughing and teasing each other.",
    "Roommates cleaned together, chatting and organizing the space.",
    "Students reviewed notes, highlighting key points and concepts.",
    "Couples cooked dinner, tasting and seasoning the food.",
    "Book club members discussed novels, sharing thoughts and opinions.",
    "Travelers explored cities, taking photos and trying local cuisine.",
    "Artists sketched outdoors, capturing landscapes and scenery.",
    "Neighbors chatted over coffee, gossiping and sharing stories.",
    "Fitness buddies exercised together, encouraging and motivating.",
    "Podcast hosts recorded episodes, discussing topics and interviewing guests.",
];

function getRandomPrompt() {
    const randomIndex = Math.floor(Math.random() * prompts.length);
    return prompts[randomIndex];
}

messagesList = document.querySelector('.prompt-clause')

document.querySelector('.next-button').addEventListener('click', function() {
    // Chọn một prompt ngẫu nhiên
    const randomPrompt = getRandomPrompt();
    // Hiển thị prompt trong console (có thể thay đổi để hiển thị ở nơi khác)
    const messageItem = document.createElement('li');
    messageItem.innerHTML = `
        <div class="prompt-clause">
            <div class="prompt-content">${randomPrompt}</div>
            <button class="voice-button-prompt">▶</button>
        </div>
    `;
    messagesList.appendChild(messageItem);
    fetch('', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            'csrfmiddlewaretoken': document.querySelector('[name=csrfmiddlewaretoken]').value,
            'message': randomPrompt,
        })
    })
    .then(response => response.json())
    .then(data => {
        const audioPath = data.response;
        const messageItem = document.createElement('li');
        messageItem.innerHTML = `
        <audio id="audioPlayer" controls>
            <source src="/static/${audioPath}" type="audio/wav">
            <embed height="50" width="100" src="{% static 'audio/first.wav' %}">
        </audio>
        `;
        messagesList.appendChild(messageItem);
    });
});

document.getElementById('voiceButton').addEventListener('click', function() {
    var audio = document.getElementById('audioPlayer');
    audio.play();
    audio.onplay = function() {
        // Khi audio bắt đầu phát, thay đổi nội dung của nút thành biểu tượng dừng
        document.getElementById('voiceButton').textContent = "📢";
    };
    audio.onended = function() {
        // Khi audio kết thúc, thay đổi nội dung của nút thành biểu tượng phát lại
        document.getElementById('voiceButton').textContent = "▶";
    };
});


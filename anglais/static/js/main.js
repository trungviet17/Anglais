const prompts = [
    "The quick brown fox jumps over the lazy dog.",
    "Betty Botter bought some butter, but she said the butter’s bitter.",
    "Tim and Sally went to the park. They saw ducks in the pond. Tim had a red ball. He threw it, and Sally caught it. The sun was bright. They had a fun day.",
    "Red leather, yellow leather.",
    "She stood on the balcony, inexplicably mimicking him hiccupping, and amicably welcoming him home.",
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
    "The sky turned a deep shade of orange as the sun dipped below the horizon, casting long shadows across the tranquil landscape.",
    "With a sigh of relief, she sank into the cozy armchair by the fireplace, savoring the warmth that enveloped her on the chilly winter evening.",
    "As the waves crashed against the rugged cliffs, he stood silently, lost in thought, contemplating the vastness of the ocean stretching out before him.",
    "With each step she took, the crunch of autumn leaves beneath her feet echoed through the deserted forest, creating a symphony of sound in the crisp, cool air.",
    "The old oak tree stood majestically in the center of the meadow, its gnarled branches reaching towards the sky, a silent sentinel watching over the passing of time.",
    "Despite the rain, they decided to go for a walk in the park, enjoying the fresh air and the sound of raindrops falling on the leaves.",
    "After a long day at work, she treated herself to a bubble bath, complete with scented candles and relaxing music playing in the background.",
    "As the sun set behind the mountains, the sky was painted with hues of pink and purple, creating a stunning display of natural beauty.",
    "With a backpack slung over his shoulder, he set off on a hiking adventure, eager to explore the wilderness and discover hidden treasures along the way.",
    "On lazy Sunday mornings, they liked to sleep in late, cuddled up under the blankets, savoring the quiet moments together before starting the day.",
    "The sound of waves crashing against the shore filled the air as they walked hand in hand along the beach, lost in conversation.",
    "With a sense of anticipation, she opened the letter and read the words written inside, a smile spreading across her face as she absorbed the good news.",
    "As the city lights twinkled in the distance, they sat on the rooftop terrace, enjoying a romantic dinner under the stars.",
    "Despite the challenges they faced, they remained optimistic, knowing that their perseverance would eventually lead them to success.",
    "With a sense of determination, he rolled up his sleeves and got to work, tackling each task with focus and dedication.",
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
    // Check if randomPrompt has content

    messageItem.innerHTML = `

    <div class="prompt-container">
        <button class="voice-button-prompt">🎙️</button>
        <div class="prompt-content">
            ${randomPrompt}
        </div>
    </div>


    `;
    messagesList.appendChild(messageItem);
});
document.addEventListener('click', function(event) {
    const clickedElement = event.target;
    if (clickedElement.classList.contains('voice-button-prompt')) {
        const parentPrompt = clickedElement.parentElement.parentElement;
        const randomPrompt = parentPrompt.querySelector('.prompt-content').textContent;
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

            // Ẩn đi tất cả các audio cũ
            const allAudioElements = parentPrompt.querySelectorAll('audio');
            allAudioElements.forEach(audio => audio.style.display = 'none');

            // Tạo ra audio mới và thiết lập autoplay
            const audioPlayer = document.createElement('audio');
            audioPlayer.setAttribute('controls', true);
            audioPlayer.setAttribute('autoplay', true);
            audioPlayer.setAttribute('id', 'audioPrompt');
            const source = document.createElement('source');
            source.setAttribute('src', '/static/' + audioPath);
            source.setAttribute('type', 'audio/wav');
            audioPlayer.appendChild(source);
            parentPrompt.appendChild(audioPlayer);
        });
    }
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

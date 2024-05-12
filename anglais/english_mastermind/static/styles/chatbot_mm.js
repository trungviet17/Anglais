const messagesList = document.querySelector('.messages-list');
const messageForm = document.querySelector('.message-form');
const messageInput = document.querySelector('.message-input');

const promptForm = document.querySelector('.prompt-form');
const prompts = [
    "Vocabulary about Food",
    "Phrasal Verbs with Get",
    "Expressing Feelings in English",
    "Formal vs. Informal Language",
    "Idioms about Time",
    "Vocabulary about Technology",
    "Phrasal Verbs with Take",
    "Describing People's Appearance",
    "Hobbies and Interests",
    "Phrasal Verbs with Put",
    "Past Tense Irregular Verbs",
    "Expressing Opinions in English",
    "Describing Places in English",
    "Giving Instructions about how to write a letter",
];
const randomPrompts = [];
while (randomPrompts.length < 3) {
    const randomIndex = Math.floor(Math.random() * prompts.length);
    if (!randomPrompts.includes(randomIndex)) {
        randomPrompts.push(randomIndex);
    }
}
const buttons = [];
randomPrompts.forEach(promptIndex => {
    const promptDisplay = document.createElement('button');
    promptDisplay.className = "btn btn-light suggestion-prompt rounded";
    promptDisplay.innerHTML = prompts[promptIndex];
    promptDisplay.setAttribute('data-index', promptIndex); // Thêm thuộc tính data-index
    const lineBreak1 = document.createElement('br');
    const lineBreak2 = document.createElement('br');
    promptForm.appendChild(promptDisplay);
    promptForm.appendChild(lineBreak1);
    promptForm.appendChild(lineBreak2);
    buttons.push(promptDisplay);
});
function createRecommendPrompt() {
    const randomPrompts = [];
    while (randomPrompts.length < 3) {
        const randomIndex = Math.floor(Math.random() * prompts.length);
        if (!randomPrompts.includes(randomIndex)) {
            randomPrompts.push(randomIndex);
        }
    }
    
    // Tạo và hiển thị các recommend prompt mới
    randomPrompts.forEach(promptIndex => {
        const promptDisplay = document.createElement('button');
        promptDisplay.className = "btn btn-light suggestion-prompt rounded";
        promptDisplay.innerHTML = prompts[promptIndex];
        promptDisplay.setAttribute('data-index', promptIndex); // Thêm thuộc tính data-index
        const lineBreak1 = document.createElement('br');
        const lineBreak2 = document.createElement('br');
        promptForm.appendChild(promptDisplay);
        promptForm.appendChild(lineBreak1);
        promptForm.appendChild(lineBreak2);
        buttons.push(promptDisplay);
    });
}

promptForm.addEventListener('click', (event)=>{
    event.preventDefault();
    // Xác định button được click
    const clickedElement = event.target;
    const messageItem = document.createElement('li');
    messageItem.classList.add('message', 'sent');
    messageItem.innerHTML = `
        <div class="message-text">
            <div class="message-sender">
                <b>You</b>
            </div>
            <div class="message-content">
                ${clickedElement.textContent}
            </div>
        </div>`;
    messagesList.appendChild(messageItem);
    buttons.forEach(button => {
        console.log(button)
        const nextSibling = button.nextElementSibling;
        if (nextSibling) {
            promptForm.removeChild(nextSibling); // Remove line break after button
        }
        const nextNextSibling = button.nextElementSibling;
        if (nextNextSibling) {
            promptForm.removeChild(nextNextSibling); // Remove another line break after button
        }
        promptForm.removeChild(button);
    });
    while (promptForm.querySelector('br')) {
        const brElement = promptForm.querySelector('br');
        promptForm.removeChild(brElement);
    }
    console.log(promptForm)
    fetch('', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
        'csrfmiddlewaretoken': document.querySelector('[name=csrfmiddlewaretoken]').value,
        'message': clickedElement.textContent,
        })
    })
    .then(response => response.json())
    .then(data => {
        const response = data.response;
        const messageItem = document.createElement('li');
        messageItem.classList.add('message', 'received');
        messageItem.innerHTML = `
        <div class="message-text">
            <div class="message-sender">
            <b>AI Chatbot</b>
            </div>
            <div class="message-content">
                ${response}
            </div>
        </div>`;
        messagesList.appendChild(messageItem);
        createRecommendPrompt();
    });
    
})


messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    buttons.forEach(button => {
        promptForm.removeChild(button);
    });
    const message = messageInput.value.trim();
    if (message.length === 0) {
        return;
    }

    const messageItem = document.createElement('li');
    messageItem.classList.add('message', 'sent');
    messageItem.innerHTML = `
        <div class="message-text">
            <div class="message-sender">
                <b>You</b>
            </div>
            <div class="message-content">
                ${message}
            </div>
        </div>`;
    messagesList.appendChild(messageItem);

    messageInput.value = '';

    fetch('', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
        'csrfmiddlewaretoken': document.querySelector('[name=csrfmiddlewaretoken]').value,
        'message': message,
        })
    })
    .then(response => response.json())
    .then(data => {
        const response = data.response;
        const messageItem = document.createElement('li');
        messageItem.classList.add('message', 'received');
        messageItem.innerHTML = `
        <div class="message-text">
            <div class="message-sender">
            <b>AI Chatbot</b>
            </div>
            <div class="message-content">
                ${response}
            </div>
        </div>`;
        messagesList.appendChild(messageItem);
    });
});
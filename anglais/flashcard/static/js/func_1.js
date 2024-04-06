function addInputFields() {
    var setCreatorElements = document.querySelectorAll(".set_creator");

    setCreatorElements.forEach(function(element) {

        var inputFieldContainer = document.createElement("div");
        inputFieldContainer.className = "inputFieldContainer";

        var word_container = document.createElement("div");
        word_container.className = "word-container";

        var translation_container = document.createElement("div");
        translation_container.className = "translation-container";

        var newInput1 = document.createElement("input");
        newInput1.type = "text";
        newInput1.placeholder = "Word";
        newInput1.className = "word";

        var newInput2 = document.createElement("input");
        newInput2.type = "text";
        newInput2.placeholder = "Translation";
        newInput2.className = "Translation";

        word_container.appendChild(newInput1);
        translation_container.appendChild(newInput2);
        

        var deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.onclick = function() {
            this.parentNode.remove();
        };
        

        var select_1 = document.createElement("select");
        var select_2 = document.createElement("select");
        var fields = ["Field 1", "Field 2", "Field 3", "Field 4"];
        select_1.className = "drop_1";
        select_2.className = "drop_2";
        for (var i = 0; i < fields.length; i++) {
            // Create an option element
            var option_1 = document.createElement("option");
            var option_2 = document.createElement("option");
            // Set the text and value of the option
            option_1.text = fields[i];
            option_1.value = fields[i];
            option_2.text = fields[i];
            option_2.value = fields[i];
            // Add the option to the select
            select_1.appendChild(option_1);
            select_2.appendChild(option_2);
        }
        var drop_1_container = document.createElement("div");
        drop_1_container.className = "drop_1_container"
        var drop_2_container = document.createElement("div");
        drop_2_container.className = "drop_2_container"
        drop_1_container.appendChild(select_1)
        drop_2_container.appendChild(select_2)
        inputFieldContainer.appendChild(drop_1_container);
        inputFieldContainer.appendChild(word_container);
        inputFieldContainer.appendChild(translation_container);
        inputFieldContainer.appendChild(drop_2_container);
        inputFieldContainer.appendChild(deleteButton);

        element.appendChild(inputFieldContainer);
    });
}

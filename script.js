const lenghtSlider = document.querySelector(".pass-length input"),
options = document.querySelectorAll(".option input"),
copyIcon = document.querySelector(".input-box span"),
passwordInput = document.querySelector(".input-box input");
passIndicator = document.querySelector(".pass-indicator");
generateBtn = document.querySelector(".generate-btn");

const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyzç",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZÇ",
    numbers: "0123456789",
    symbols: "!@#$%¨&*()_+={}[]|?:;.,^~´`",
}

const generatePassword = () => {
    let staticPassword = "",
    randomPassoword = "",
    excludeDuplicate = false,
    passLength = lenghtSlider.value;

        options.forEach(option => {
            if (option.checked) {
                if (option.id !== "exc-duplicate" && option.id !== "spaces") {
                staticPassword += characters[option.id]
                } else if (option.id === "spaces") {
                    staticPassword += ` ${staticPassword} `;
                } else {
                    excludeDuplicate = true;
                }
            }
        })

        for (let i = 0; i < passLength; i++) {
            let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)]
            if (excludeDuplicate) {
                !randomPassoword.includes(randomChar) || randomChar == " " ? randomPassoword += randomChar : i--;
            } else {
                randomPassoword += randomChar
            }
        }
        passwordInput.value = randomPassoword;
}

const updatePassIndicator = () => {
    passIndicator.id = lenghtSlider.value <= 4 ? "weak" : lenghtSlider.value <= 8 ? "medium" : "strong";
}

const updateSlider = () => {
    document.querySelector(".pass-length span").innerText = lenghtSlider.value;
    generatePassword();
    updatePassIndicator();
}
updateSlider()

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.innerText = "check";
    setTimeout(() => {
        copyIcon.innerText = "copy_all";
    }, 1500);
}

copyIcon.addEventListener("click", copyPassword);
lenghtSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
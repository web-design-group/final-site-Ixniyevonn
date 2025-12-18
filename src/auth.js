  for (let i = 0; i < 36; i++) {
                document.getElementById("password-inputs").innerHTML += `<input type="text" class="password-input" onclick='fillPassword()' />`;
            }

            function fillPassword() {
                let words = [
                    "aback",
                    "abaft",
                    "abandoned",
                    "abashed",
                    "aberrant",
                    "abhorrent",
                    "abiding",
                    "abject",
                    "ablaze",
                    "able",
                    "abnormal",
                    "aboard",
                    "access",
                    "activities",
                    "adjectives",
                    "burst",
                    "button",
                    "challenges",
                    "classroom",
                    "clean",
                    "click",
                    "common",
                    "discover",
                    "edit",
                    "every",
                    "fill",
                    "free",
                    "games",
                    "generator",
                    "great",
                    "hit",
                    "ideas",
                    "inspiration",
                    "instant",
                    "list",
                    "lovers",
                    "naming",
                    "needs",
                    "new",
                    "nouns",
                    "prompts",
                    "quick",
                    "random",
                    "rerun",
                    "search",
                    "set",
                    "teachers",
                    "thousands",
                    "unique",
                    "vocabulary",
                    "watch",
                    "writers",
                ];
                let randomWords = Array.from({ length: 36 }, (v, k) => words[Math.floor(Math.random() * words.length)]);
                let inputs = document.querySelectorAll(".password-input");
                let currentSymbol = 0;
                let currentInput = 0;

                function fillNext() {
                    if (currentSymbol < randomWords[currentInput].length) {
                        inputs[currentInput].value += randomWords[currentInput][currentSymbol];
                        currentSymbol++;
                        setTimeout(fillNext, 2);
                    } else if (currentInput < inputs.length - 1) {
                        currentInput++;
                        currentSymbol = 0;
                        setTimeout(fillNext, 2);
                    }
                }

                fillNext();
            }
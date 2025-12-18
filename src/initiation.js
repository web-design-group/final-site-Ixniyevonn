        const chatTranscript = document.querySelector(".chat-transcript");
            const chatInput = document.querySelector(".chat-input");
            const initiationChatInner = document.querySelector(".initiation-chat-inner");

            const botChunks = [
                '[Куратор]: Принято. Передаю брифу. Специалист по стратегии – оценка. Аудитор – уязвимости. Контакты на standby.\n[Специалист по стратегии]: Анализ брифа: Рекомендую 3-уровневую схему – ложные нарративы для отвлечения (этап 1: медиа-кампания о "гуманитарной логистике"), шифрованные подканалы для координации (этап 2-3), самоуничтожающиеся архивы (этап 4-5). Прогноз: Снижение рисков на 65%. Корректировки?',
                '[Специалист по стратегии]: Интегрировано. Обновленный план: Нарратив – "Зеленая цепочка поставок" с подтекстом. Подрядчики из вашего пула: Логистика – TransGlobal Freight (протокол: одноразовый код 47X9). Стратегия готова для отчета.\n[Аудитор]: Аудит уязвимостей: Слабые точки – незащищенные API в цепочке (риск MITM 40%), персонал без психо-подготовки (утечки 25%). Рекомендации: Внедрить zero-knowledge верификацию для API; сессия обучения (2ч, фокус: анти-шпионаж). Тестирование: Симуляция атаки – пройти за 48ч?',
                "[Аудитор]: Запущено. Результаты в отчете. Контакты для теста: Компьютерная безопасность – Nexus Tech Guard (endpoint: secure@nexustechguard.net). Устранение: 90% покрытие.\n[Куратор]: Первичная консультация завершена. Полный отчет: Стратегия + Аудит + Контакты (5 релевантных). Оплата аванса подтверждена? Корректировки – лимит 2. Закрытие канала через 1ч.",
                "[Куратор]: Добавлено. Отчет отправлен в ваш профиль. Канал на паузе. Следующий: По запросу. Конец сессии.",
            ];

            let currentChunk = 0;

            function typeMessage(element, text, callback) {
                let i = 0;
                function typeNext() {
                    if (i < text.length) {
                        element.textContent += text.charAt(i);
                        i++;
                        setTimeout(typeNext, 2);
                    } else {
                        if (callback) callback();
                    }
                }
                typeNext();
            }

            function addBotChunk(chunkIndex) {
                if (chunkIndex >= botChunks.length) return;

                const chunk = botChunks[chunkIndex];
                const lines = chunk.split("\n");
                let lineIndex = 0;

                function processNextLine() {
                    if (lineIndex < lines.length) {
                        const line = lines[lineIndex].trim();
                        if (line) {
                            const botP = document.createElement("p");
                            botP.textContent = "";
                            chatTranscript.appendChild(botP);

                            typeMessage(botP, line, () => {
                                setTimeout(() => {
                                    lineIndex++;
                                    processNextLine();
                                    initiationChatInner.scrollTop = initiationChatInner.scrollHeight;
                                }, 300); 
                            });
                        } else {
                            lineIndex++;
                            processNextLine();
                        }
                    } else {
                        currentChunk++;
                        initiationChatInner.scrollTop = initiationChatInner.scrollHeight;
                    }
                }

                processNextLine();
            }

            chatInput.addEventListener("keypress", function (e) {
                if (e.key === "Enter") {
                    const input = chatInput.value.trim();
                    if (input) {
                        const userP = document.createElement("p");
                        userP.textContent = `[Клиент]: ${input}`;
                        chatTranscript.appendChild(userP);

                        chatInput.value = "";

                        setTimeout(() => {
                            if (currentChunk < botChunks.length) {
                                addBotChunk(currentChunk);
                            }
                        }, 500);

                        initiationChatInner.scrollTop = initiationChatInner.scrollHeight;
                    }
                }
            });

            chatInput.focus();
class Chat {
    constructor(game) {
        this.game = game;
        this.chatDiv = document.querySelector(".chat");
        this.listen();
        this.history = [""];
        this.histState = 0;
        $(".com_i").on("input", () => {
            this.history[this.history.length - 1] = $(".com_i").val();
            console.log(this.history);
        });
        return;
    }

    chatGoBack() {
        if (this.histState > 0) {
            this.histState--;
            $(".com_i").val(this.history[this.histState]);
        }
    }

    chatGoForward() {
        if (this.histState < this.history.length - 1) {
            this.histState++;
            $(".com_i").val(this.history[this.histState]);
        }
    }

    listen() {
        window.addEventListener(
            "wheel",
            (e) => {
                if (this.game.eh.gameState !== "chat") {
                    e.preventDefault();
                }
            },
            {
                passive: false,
            }
        );
        return this;
    }

    isElementScrolledToBottom(el) {
        if (el.scrollTop >= el.scrollHeight - el.offsetHeight) {
            return true;
        }
        return false;
    }

    scrollToBottom(el) {
        el.scrollTop = el.scrollHeight;
    }

    log(message) {
        const replacements = [[/&/g, "&amp;"], [/</g, "&lt;"], [/>/g, "&gt;"], [/"/g, "&quot;"]];
        for (const replacement of replacements)
            message = message.replace(replacement[0], replacement[1]);
        $(".chat").append(`<span>${message}<br></span>`);
        this.scrollToBottom(this.chatDiv);
    }

    command(com) {
        if (com !== "") {
            this.history[this.history.length - 1] = com;
            this.history.push("");
            this.histState = this.history.length - 1;
            console.log(this.history);
            return this.game.socket.emit("command", com);
        }
    }
}

export { Chat };

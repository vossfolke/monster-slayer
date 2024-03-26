function getRandomValue(min, max){
    return Math.floor(Math.random() * (max-min)+min)
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            specialAttackCD: 0,
            winner: null,
            logMessages: [],
        }
    },
    watch: {
        playerHealth(value) {
            if ( value <= 0 && this.monsterHealth <= 0 ){
                this.winner = 'draw'
            } else if ( value <= 0) {
                this.winner = 'monster'
            }
        },
        monsterHealth(value) {
            if ( value <= 0 && this.playerHealth <= 0 ){
                this.winner = 'draw'
            } else if ( value <= 0) {
                this.winner = 'player'
            }
        }

    },
    computed: {
        monsterBarStyles(){
            if (this.monsterHealth < 0){
                return{width: 0 + '%'}
            } else {
                return {width: this.monsterHealth + '%'};
            }
        },
        playerBarStyles() {
            if (this.playerHealth < 0){
                return{width: 0 + '%'}
            } else {
                return {width: this.playerHealth + '%'};
            }
        },
        specialAttackAvaiable() {
            return this.specialAttackCD !== 0;
        }
    },
    methods: {
        attackMonster() {
            if (this.specialAttackCD > 0){
                this.specialAttackCD--
            }
           const attackValue = getRandomValue(5, 12)
           this.monsterHealth -= attackValue
           this.addLogMessages('player', 'attack', attackValue )
           this.attackPlayer()
        },
        attackPlayer(){
           const attackValue = getRandomValue(8, 15)
           this.playerHealth -= attackValue  
           this.addLogMessages('monster', 'attack', attackValue )
        },
        specialAttackMonster() {
            this.specialAttackCD = 3
            const attackValue = getRandomValue(10,25)
            this.monsterHealth -= attackValue
            this.addLogMessages('player', 'attack', attackValue )
            this.attackPlayer()
        },
        healPlayer() {
            if (this.specialAttackCD > 0){
                this.specialAttackCD--
            }
            const healValue = getRandomValue(8,20)
            if ( this.playerHealth + healValue > 100) {
                this.playerHealth = 100
            } else {
                this.playerHealth += healValue
            }
            this.addLogMessages('player', 'heal', healValue )
            this.attackPlayer()
        },
        startGame() {
            this.playerHealth = 100
            this.monsterHealth = 100
            this.specialAttackCD = 0
            this.winner = null
            this.logMessages = []
        },
        surrender() {
            this.winner = 'monster'
        },
        addLogMessages ( who, what, value ) {
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            })
        }
    }
});

app.mount('#game')
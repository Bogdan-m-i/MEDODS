<template>
	<div class="simon">
		<div class="simon__options">
			<div class="simon__round">
				<span>Раунд: Х</span>
				<button @click="startGame" :disabled="!play && round !== 0">Старт</button>
				<p v-if="!gameOver">Раунд {{round}}</p>
				<p v-if="gameOver">Game Over</p>
			</div>
			<div class="simon__level">
				<span>Сложность:</span>
				<input type="radio" name="level" id="level-1" value="1" v-model="level" checked>
				<label for="level-1">1</label>
				<input type="radio" name="level" id="level-2" value="2" v-model="level">
				<label for="level-2">2</label>
				<input type="radio" name="level" id="level-3" value="3" v-model="level">
				<label for="level-3">3</label>
			</div>
		</div>
		<div class="simon__game" :class="{'play': play}">
			<div class="simon__row">
				<div class="simon__btn simon__btn_blue" @click="click" ref="blue" data-simon-btn="1"></div>
				<div class="simon__btn simon__btn_red" @click="click" ref="red" data-simon-btn="2"></div>
			</div>
			<div class="simon__row">
				<div class="simon__btn simon__btn_yellow" @click="click" ref="yellow" data-simon-btn="3"></div>
				<div class="simon__btn simon__btn_green" @click="click" ref="green" data-simon-btn="4"></div>
			</div>
		</div>
		<div><audio autoplay :src="audioFile"></audio></div>
	</div>
</template>

<script>
export default {
	data: () => ({
		level: 1,
		round: 0,
		play: false,
		gameOver: false,
		dataComp: [],
		dataUser: [],
		audioId: ''
	}),
	methods: {
		startGame() {
			this.play = true
			this.dataComp = []
			this.dataUser = []
			this.gameOver = false
			this.round = 0

			this.newRound()
		},
		newRound() {
			this.play = false
			this.round++
			this.dataUser = []
			this.dataComp.push(this.random())

			this.dataComp.forEach((el, key, arr) => {
				setTimeout(() => {
					this.animate(document.querySelector(`[data-simon-btn="${el}"]`))
				}, (this.time + 300) * key)

				if (key +1 === arr.length) {
					setTimeout(() => {
						this.play = true
					}, this.time * key + this.time + 300)
				}
			})
		},
		click(event) {
			if (this.play) {
				let len = this.dataUser.push(+event.target.dataset.simonBtn)

				this.animate(event.target, 200)

				if (this.dataUser[len-1] === this.dataComp[len-1]) {
					console.log('sovpalo')
					if (len === this.dataComp.length) {
						setTimeout(() => { this.newRound() }, 1000)
					}
				} else {
					console.log('NEsovpalo')
					this.endGame()
				}
			}
		},
		endGame() {
			this.play = false
			this.gameOver = true
		},
		animate(el, t = this.time) {
			this.audioId = el.dataset.simonBtn

			el.classList.add('active')
			setTimeout(() => {
				el.classList.remove('active')
				this.audioId = false
			}, t)
		},
		random() {
			return Math.ceil(Math.random() * 4)
		},
	},
	computed: {
		time() {
			if (this.level === 1) {
				return 1500
			} else if (this.level === 2) {
				return 1000
			} else {
				return 400
			}
		},
		audioFile() {
			if (!this.audioId) return;
			return require(`@/assets/audio/sounds_${this.audioId}.mp3`)
		}
	},
}
</script>

<style lang="scss">
	.simon {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 70vh;

		&__options {
			margin-bottom: 80px;
		}

		&__round {
			margin-bottom: 15px;

			span {
				margin-right: 15px;
			}
		}

		&__level {
			display: flex;
			
			span {
				margin-right: 15px;
			}
			
			label {
				margin: 0;

				&:not(:last-child) {
					margin-right: 10px;
				}
			}
		}

		&__game {
			border: 5px solid rgb(124, 124, 124);

			&.play {
				.simon__btn {
					&:hover {
						cursor: pointer;
					}
				}
			}
		}

		&__row {
			display: flex;
		}

		&__btn {
			width: 150px;
			height: 150px;
			box-sizing: border-box;
			transition: all .3s;
			opacity: 0.4;

			&.active {
				opacity: 1;
			}

			&:hover {
				border: 3px solid white;
			}
		}
		&__btn_blue {
			background: rgb(0, 0, 255);
		}
		&__btn_red {
			background: rgb(255, 0, 0);
		}
		&__btn_yellow {
			background: rgb(255, 255, 0);
		}
		&__btn_green {
			background: rgb(0, 255, 0);
		}
	}
</style>
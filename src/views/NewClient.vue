<template>
	<div>
		<div v-if="formDone" class="text-center">
			<h1>Клиент добавлен</h1>
			<button class="btn" @click="formReload">Добавить еще</button>
		</div>
		<div v-if="!formDone">
			<h1 class="text-center">Новый клиент</h1>
			<form action="#" class="form" @submit.prevent="submitHandler">
				<div class="form__header">Клиент</div>
				<div class="form__row">
					<div class="form__group">
						<label for="surname">Фамилия*</label>
						<input type="text" v-model.trim="form.surname" id="surname">
						<span class="form__error" v-if="$v.form.surname.$dirty && !$v.form.surname.required">Введите фамилию</span>
					</div>
					<div class="form__group">
						<label for="name" :class="{'comlite': !$v.form.name.$invalid}">Имя*</label>
						<input type="text" v-model.trim="form.name" id="name">
						<span class="form__error" v-if="$v.form.name.$dirty && !$v.form.name.required">Введите имя</span>
					</div>
				</div>
				<div class="form__row">
					<div class="form__group">
						<label for="patronymic">Отчество</label>
						<input type="text" v-model.trim="form.patronymic">
					</div>
					<div class="form__group">
						<label for="gender">Пол</label>
						<select v-model.trim="form.gender" id="gender">
							<option v-for="opt in genderData" :key="opt.id" :value="opt.id">{{opt.display}}</option>
						</select>
					</div>
				</div>
				<div class="form__row">
					<div class="form__group">
						<label for="birthday">Дата рождения*</label>
						<input type="date" v-model.trim="form.birthday">
						<span class="form__error" v-if="$v.form.birthday.$dirty && !$v.form.birthday.required">Введите дату рождения</span>
					</div>
					<div class="form__group">
						<label for="phone">Номер телефона*</label>
						<input type="text" v-model.number.trim="form.phone">
						<span class="form__error" v-if="($v.form.phone.$dirty && !$v.form.phone.required) || ($v.form.phone.$dirty && !$v.form.phone.numeric) || ($v.form.phone.$dirty && !$v.form.phone.between)">Введите телефон в формате 7XXXXXXXXXX</span>
					</div>
				</div>
				<div class="form__row">
					<div class="form__group">
						<label for="clientGroup">Группа клиентов*</label>
						<select v-model.trim="form.clientGroup" id="clientGroup" multiple :size="clientsGroupData.length">
							<option v-for="opt in clientsGroupData" :key="opt.id" :value="opt.id">{{opt.display}}</option>
						</select>
						<span class="form__error" v-if="$v.form.clientGroup.$dirty && !$v.form.clientGroup.required">Выберите группу</span>
					</div>
					<div class="form__group">
						<label for="doctor">Лечащий врач</label>
						<select v-model.trim="form.doctor">
							<option v-for="opt in doctorsData" :key="opt.id" :value="opt.id">{{opt.display}}</option>
						</select>
					</div>
				</div>
				<div class="form__group form__group-inline">
					<input type="checkbox" v-model.trim="form.noSMS" id="sendSMS">
					<label for="sendSMS">Не отправлять СМС</label>
				</div>
				<!-- адрес -->
				<div class="form__header">Адрес</div>
				<div class="form__row">
					<div class="form__group form__group-small">
						<label for="zipCode">Индекс</label>
						<input type="text" v-model.number.trim="form.zipCode" id="zipCode">
					</div>
					<div class="form__group">
						<label for="country">Страна</label>
						<input type="text" v-model.trim="form.country" id="country">
					</div>
					<div class="form__group">
						<label for="region">Область</label>
						<input type="text" v-model.trim="form.region" id="region">
					</div>
					<div class="form__group">
						<label for="city">Город*</label>
						<input type="text" v-model.trim="form.city" id="city">
						<span class="form__error" v-if="$v.form.city.$dirty && !$v.form.city.required">Введите город</span>
					</div>
					<div class="form__group">
						<label for="street">Улица</label>
						<input type="text" v-model.trim="form.street" id="street">
					</div>
					<div class="form__group form__group-small">
						<label for="houseNumber">Дом</label>
						<input type="text" v-model.trim="form.houseNumber" id="houseNumber">
					</div>
				</div>
				<!-- паспорт -->
				<div class="form__header">Документы</div>
				<div class="form__row">
					<div class="form__group">
						<label for="document">Тип докумениа*</label>
						<select v-model.trim="form.document">
							<option multiple v-for="opt in documentTypeData" :key="opt.id" :value="opt.id">{{opt.display}}</option>
						</select>
						<span class="form__error" v-if="$v.form.document.$dirty && !$v.form.document.required">Выберите тип документа</span>
					</div>
					<div class="form__group">
						<label for="issueDate">Дата выдачи*</label>
						<input type="date" v-model.trim="form.issueDate" id="issueDate">
						<span class="form__error" v-if="$v.form.issueDate.$dirty && !$v.form.issueDate.required">Введите дату выдачи</span>
					</div>
				</div>
				<div class="form__row">
					<div class="form__group form__group-small">
						<label for="series">Серия</label>
						<input type="text" v-model.trim="form.series" id="series">
					</div>
					<div class="form__group">
						<label for="number">Номер</label>
						<input type="text" v-model.trim="form.number" id="number">
					</div>
				</div>
				<div class="form__row">
					<div class="form__group">
						<label for="issuedWho">Кем выдан</label>
						<input type="text" v-model.trim="form.issuedWho" id="issuedWho">
					</div>
					
				</div>
				<div class="form__row">
					<div class="form__group">
						<button class="btn" type="submit">Сохранить</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import {required, numeric, between} from 'vuelidate/lib/validators'

export default {
	name: 'new-client',
	data: () => ({
		form: {
			surname: '',
			name: '',
			patronymic: '',
			birthday: '',
			phone: '7',
			clientGroup: [],
			doctor: '',
			gender: '',
			noSMS: '',
			zipCode: '',
			country: '',
			region: '',
			city: '',
			street: '',
			houseNumber: '',
			document: '',
			series: '',
			number: '',
			issuedWho: '',
			issueDate: '',
		},
		genderData: [
			{id: '', display: ''},
			{id: '1', display: 'Муж.'},
			{id: '2', display: 'Жен.'},
		],
		clientsGroupData: [
			// {id: '', display: ''},
			{id: '1', display: 'VIP'},
			{id: '2', display: 'Проблемные'},
			{id: '3', display: 'ОМС'},
		],
		doctorsData: [
			{id: '', display: ''},
			{id: '1', display: 'Иванов'},
			{id: '2', display: 'Захаров'},
			{id: '3', display: 'Чернышева'},
		],
		documentTypeData: [
			{id: '', display: ''},
			{id: '1', display: 'Паспорт'},
			{id: '2', display: 'Свидетельство о рождении'},
			{id: '3', display: 'Вод. удостоверение'},
		],
		formDone: false,
	}),
	validations: {
		form: {
			name: {required},
			surname: {required},
			birthday: {required},
			phone: {required, numeric, between: between(70000000000, 79999999999)},
			clientGroup: {required},
			city: {required},
			document: {required},
			issueDate: {required},
		}
	},
	methods: {
		submitHandler() {
			if (this.$v.form.$invalid) {
				this.$v.form.$touch()
				return
			}

			if (!this.$v.form.$invalid) {

				Object.keys(this.form).forEach((el) => {
					if (el === 'clientGroup') {
						this.form[el] = []
					} else if (el === 'phone') {
						this.form[el] = '7'
					} else {
						this.form[el] = ''
					}
				})

				this.formDone = true
				this.$v.$reset()
			}

		},
		formReload() {
			this.formDone = false

		}
	},
}
</script>

<style lang="scss">
	.text-center {
		text-align: center;
	}

	.form {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		max-width: 500px;
		margin: 0 auto;
		margin-bottom: 100px;

		&__header {
			border-bottom: solid 2px indigo;
			color: indigo;
			font-size: 0.7rem;
			text-transform: uppercase;
			font-weight: bold;
			padding: 5px;
			margin: 10px 0;
		}

		&__group {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			padding: 10px;
			position: relative;
			flex-grow: 1;
		}
		&__group-small {
				max-width: 30%;
			}

		&__row {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			margin-right: -10px;
			margin-left: -10px;
		}

		&__error {
			font-size: 0.8rem;
			color: salmon;
			animation: opacity .3s 1 ease-in-out;
			position: absolute;
			top: calc(100% - 20px);
			left: 10px;
			margin-left: 5px;
		}

		input, select {
			border: none;
			padding: 8px 15px;
			background: rgb(238, 238, 238);
			margin-bottom: 15px;
			border-radius: 9px;
			overflow: hidden;

			&:focus {
				outline: none;
				background: rgb(245, 245, 245);
			}
		}

		input {
			height: 1rem;
		}

		label {
			font-size: 0.8rem;
			font-weight: bold;
			margin-bottom: 5px;
			margin-left: 5px;
		}

		&__group-inline {
			flex-direction: row;

			input {
				margin: 0 5px 0 0;
			}

			label {
				align-self: center;
				margin-bottom: 0;
			}
		}
	}

	.btn {
			background: rgb(131, 169, 240);
			text-transform: uppercase;
			border: none;
			border-radius: 9px;
			padding: 8px 15px;
			cursor: pointer;

			&:focus {
				outline: none;
			}
		}

	@keyframes opacity {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
</style>
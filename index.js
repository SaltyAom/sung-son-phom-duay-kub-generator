document.addEventListener('DOMContentLoaded', () => {
	/**
	 * Function Declaration
	 */
	const id = (id) => document.getElementById(id),
		setup = () => {
			canvas.width = 1200
			canvas.height = 500

			context.fillStyle = '#fff'
			context.fillRect(0, 0, canvas.width, canvas.height)
		},
		drawProfile = () => {
			/**
			 * Setup
			 *
			 * margin: x = 90, y = 130
			 * imageSize: 240
			 */

			let context = canvas.getContext("2d")

			context.beginPath()
			/* Center X, Center Y, Radius, Start Angle, End Angle */
			context.arc(
				210,
				250,
				120,
				(2 * Math.PI) / 180,
				(360 * Math.PI) / 180,
				false
			)
			context.closePath()
			context.clip()

			context.drawImage(
				profile,
				0,
				0,
				profile.naturalWidth,
				profile.naturalHeight,
				90,
				130,
				240,
				240
			)

			/* Clean up */
			showResult()

			profile.removeEventListener('load', drawProfile, {
				passive: true,
			})
		},
		updateProfile = () => {
			profile.addEventListener('load', drawProfile, {
				passive: true,
			})
		},
		render = () => {
			setup()

			let font =
				"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"

			let context = canvas.getContext('2d')

			context.fillStyle = '#333'
			context.font = `84px ${font}`
			context.fillText(name, 380, 210)

			context.font = `69px ${font}`
			context.fillText('สั่งสอนผมด้วยครับ', 380, 330)

			updateProfile()
		},
		showResult = () => {
			id('result').setAttribute('src', canvas.toDataURL("image/jpeg"))
		}

	/* Main Process */
	let canvas = id('canvas'),
		context = canvas.getContext('2d'),
		profile = id('profile'),
		name = 'SaltyAom'

	/* Handle new image uploaded */
	id('change-profile').addEventListener(
		'click',
		() => {
			id('profile-file').click()
		},
		{
			passive: false,
		}
	)

	id('profile-file').addEventListener('change', (event) => {
		let files = event.target.files

		if (!files || !files[0]) return

		let reader = new FileReader()

		reader.addEventListener('load', ({ target: { result } }) => {
			let image = new Image()
			image.setAttribute('src', result)
			profile = image

			render()
		})

		reader.readAsDataURL(files[0])
	})

	id('profile-file').addEventListener('change', (event) => {
		let files = event.target.files

		if (!files || !files[0]) return

		let reader = new FileReader()

		reader.addEventListener('load', ({ target: { result } }) => {
			let image = new Image()
			image.setAttribute('src', result)
			profile = image

			render()
		})

		reader.readAsDataURL(files[0])
	})

	id('name').addEventListener('input', ({ target: { value } }) => {
		requestAnimationFrame(() => {
			name = value

			setup()
			render()
			drawProfile()
		})
	})
})

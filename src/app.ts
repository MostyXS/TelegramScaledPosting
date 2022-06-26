import './extensions/object.extensions.js'
import './extensions/array.extensions.js'
import './extensions/string.extensions.js'
import './main/extensions/composer.extensions.js'
import './main/extensions/context.extensions.js'
import './main/extensions/telegram.exetensions.js'

;(async () => {
    const dotenv = await import('dotenv')
    dotenv.config()
    await import('./main/index.js')
    
})()
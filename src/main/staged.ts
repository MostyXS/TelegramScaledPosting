import { Composer, Scenes } from 'telegraf'
import { BotCommand } from 'telegraf/typings/core/types/typegram'
import { CategoriesCD, categoriesComposer } from './composers/categories.js'
import { KeywordsCD, keywordsComposer } from './composers/keywords.js'
import { OwnerCD, ownerComposer } from './composers/owner.js'
import {
    PostCD,
    postComposer,
} from './composers/post.js'

export const mainComposer = new Composer<Scenes.WizardContext>(
    ownerComposer,
    postComposer,
    categoriesComposer,
    keywordsComposer
)

export const MainCD: BotCommand[] =
    OwnerCD.concat(PostCD, CategoriesCD, KeywordsCD)
    

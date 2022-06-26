import { Composer, Scenes } from 'telegraf'
import { BotCommand } from 'telegraf/typings/core/types/typegram'
import { CategoriesCD, categoriesComposer } from './categories.js'
import { MatchesCD, matchesComposer } from './matches.js'
import { OwnerCD, ownerComposer } from './owner.js'
import {
    PostCD,
    postComposer,
} from './post.js'

export const mainComposer = new Composer<Scenes.WizardContext>(
    ownerComposer,
    postComposer,
    categoriesComposer,
    matchesComposer
)

export const MainCD: BotCommand[] =
    OwnerCD.concat(PostCD, CategoriesCD, MatchesCD)
    

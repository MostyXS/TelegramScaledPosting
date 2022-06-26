import { Composer } from 'telegraf';
import { CategoriesCD, categoriesComposer } from './categories.js';
import { MatchesCD, matchesComposer } from './matches.js';
import { OwnerCD, ownerComposer } from './owner.js';
import { PostCD, postComposer, } from './post.js';
export const mainComposer = new Composer(ownerComposer, postComposer, categoriesComposer, matchesComposer);
export const MainCD = OwnerCD.concat(PostCD, CategoriesCD, MatchesCD);

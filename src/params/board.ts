import type { ParamMatcher } from '@sveltejs/kit';
import { boards } from '$lib/boards';

export const match: ParamMatcher = (param) => {
    return boards.some(x => x.slug == param);
}
import type { ParamMatcher } from '@sveltejs/kit';

const guidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

export const match: ParamMatcher = (param) => {
    return guidRegex.test(param);
}
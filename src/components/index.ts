import {Goals} from '../pages/posts/2022/01/goals/goals';
import {Mochip} from '../pages/posts/2022/01/mochip/mochip';
import {ServerlessDiscordOAuth} from '../pages/posts/2022/01/serverless-discord-oauth/serverless-discord-oauth';
import {ZeroKbBlog} from '../pages/posts/2022/01/zero-kb-blog/zero-kb-blog';
import {OpenSource} from '../pages/posts/2022/03/open-source/open-source';
import {StrictTSConfig} from '../pages/posts/2022/08/strict-tsconfig/strict-tsconfig';
import {WhichFruitsMayYouReap} from '../pages/posts/2023/which-fruits-may-you-reap/which-fruits-may-you-reap';
import {WTFESM} from '../pages/posts/2023/wtf-esm/wtf-esm';
import {SearchingGitHubForOpenAIApiKeys} from '../pages/posts/2024/searching-github-openai-api-keys/searching-github-openai-api-keys';
import {FunWithDNSTxtRecords} from '../pages/posts/2024/fun-with-dns-txt-records/fun-with-dns-txt-records';

export const posts = [
	new WhichFruitsMayYouReap(),
	new WTFESM(),
	new OpenSource(),
	new Mochip(),
	new ZeroKbBlog(),
	new ServerlessDiscordOAuth(),
	new Goals(),
	new StrictTSConfig(),
	new SearchingGitHubForOpenAIApiKeys(),
	new FunWithDNSTxtRecords(),
] as const;

export function sortPosts(p: typeof posts) {
	return [...p].sort((a, b) => {
		if (a.date > b.date) {
			return -1;
		}

		if (a.date < b.date) {
			return 1;
		}

		return 0;
	});
}

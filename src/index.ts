export interface Env {
	DEEPSEEK_API_KEY: string;
}

interface DeepSeekResp {
	choices: {
		message: { content: string };
	}[];
}

function corsHeaders() {
	return {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'POST, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type, Authorization',
	};
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		if (request.method === 'OPTIONS') {
			// Preflight request handling
			return new Response(null, {
				status: 204,
				headers: corsHeaders(),
			});
		}

		if (request.method !== 'POST') {
			return new Response('Method Not Allowed', {
				status: 405,
				headers: corsHeaders(),
			});
		}

		try {
			const { prompt } = (await request.json()) as { prompt?: string };

			if (!prompt) {
				return new Response('Missing prompt', {
					status: 400,
					headers: corsHeaders(),
				});
			}

			const apiResp = await fetch('https://api.deepseek.com/v1/chat/completions', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${env.DEEPSEEK_API_KEY}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					model: 'deepseek-chat',
					messages: [{ role: 'user', content: prompt }],
				}),
			});

			if (!apiResp.ok) {
				return new Response('DeepSeek API Error', {
					status: 500,
					headers: corsHeaders(),
				});
			}

			const data = (await apiResp.json()) as DeepSeekResp;
			const text = data.choices?.[0]?.message?.content?.trim() ?? '';

			return new Response(JSON.stringify({ ok: true, text }), {
				status: 200,
				headers: {
					...corsHeaders(),
					'Content-Type': 'application/json',
				},
			});
		} catch (err) {
			return new Response('Error processing request', {
				status: 500,
				headers: corsHeaders(),
			});
		}
	},
};

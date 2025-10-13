import { cdpPost } from 'apps/web/src/cdp/utils';
import { logger } from 'apps/web/src/utils/logger';

type ErrorResponse = {
  code: number;
};

type QueryCbGptResponse = {
  response: string;
  chat_session_id: string;
  num_tokens_used: number;
  output_tokens_used: number;
};

type CbGptQuery = {
  taskConfig: CbGptTaskConfig;
  query: string;
  orComponentId: string;
};

type CbGptTaskConfig = {
  actionLlm: { chatLlm: string };
  action_prompt_template: { init_llm_chain: string };
};

export async function queryCbGpt(query: CbGptQuery): Promise<QueryCbGptResponse> {
  try {
    const response = await cdpPost(`cb-gpt-api/v1/query`, query, true);

    if (response.ok) {
      const res = (await response.json()) as QueryCbGptResponse;
      return res;
    }
    const contentType = response.headers.get('content-type');
    let errorResponse: ErrorResponse | string;

    if (contentType?.includes('application/json')) {
      errorResponse = (await response.json()) as ErrorResponse;
    } else {
      errorResponse = await response.text();
    }

    if (response.status === 401 || response.status === 403) {
      throw new Error(`Forbidden: ${response.status} ${JSON.stringify(errorResponse)}`);
    }

    if (response.status === 500 && typeof errorResponse !== 'string' && errorResponse.code === 13) {
      throw new Error('No user found');
    }

    throw new Error(
      `Unexpected error: ${response.statusText}, Response: ${JSON.stringify(errorResponse)}`,
    );
  } catch (error) {
    logger.error('Error querying cb-gpt:', error);
    throw error;
  }
}

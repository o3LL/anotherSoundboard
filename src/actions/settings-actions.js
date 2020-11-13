/**
 * Likes Actions.
 * Available actions:
 * - Do Like: post new like.
 * - Do Dislike: post new dislike.
 */

export const CHANGE_CONFIG = 'CHANGE_CONFIG';
export function changeConfig(config) {
  return {
    type: CHANGE_CONFIG,
    payload: config,
  };
}

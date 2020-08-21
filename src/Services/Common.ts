/**
 * Get Id from Url.
 *
 * @param  {String} url - URL of content item.
 *
 * @return {number} id of content item.
 */
export const prepareUrl = (url: string): number => {
    const urlParts = url.split("/");
    return Number(urlParts[urlParts.length - 2]);
}
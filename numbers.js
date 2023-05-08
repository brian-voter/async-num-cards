"use strict"

const BASE_URL = "http://numbersapi.com";

/**
 * Gets a fact about a number
 * @param {number} num
 * @returns {string}
 */
async function getFactAboutNumber(num) {
    const response = await axios.get(`${BASE_URL}/${num}?json`);

    return response.data.text;
}

/**
 * Gets one fact about each number in nums
 * @param  {...number} nums
 * @returns {string[]} array of facts (strings)
 */
async function getFactsAboutNumbers(...nums) {
    const response = await axios.get(`${BASE_URL}/${nums.join(",")}?json`);

    return response.data
}

/**
 * Gets multiple facts about a number num
 * @param  {number} num an int
 * @param {number} howMany an int, how many facts to get
 * @returns {string[]} array of facts (strings)
 */
async function getFactsAboutNumber(num, howMany) {
    const requests = [];

    for (let i = 0; i < howMany; i++) {
        requests.push(axios.get(`${BASE_URL}/${num}?json`));
    }

    return (await Promise.all(requests)).map(response => response.data.text);
}
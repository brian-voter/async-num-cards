"use strict";

const BASE_URL = "http://numbersapi.com";
const $main = $("main");

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
 * @returns {string{}}} object of facts (strings)
 */
async function getFactsAboutNumbers(...nums) {
    const response = await axios.get(`${BASE_URL}/${nums.join(",")}?json`);

    return response.data;
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

/**
 * displays a fact for each number in nums array
 * @param {number[]} nums
 */
async function displayFactsAboutNumbers(nums) {
    const facts = await getFactsAboutNumbers(nums);
    const $header = $("<h1>Facts About Many Numbers</h1>");

    $main.append($header);

    for (let fact in facts) {
        const $div = $(`<div>${fact}: ${facts[fact]}</div>`);
        $main.append($div);
    }
}

/**
 * displays howMany amount of facts for num
 * @param {number} num an int
 * @param {number} howMany an int, how many facts to get
 */
async function displayFactsAboutNumber(num, howMany) {
    const facts = await getFactsAboutNumber(num, howMany);
    const $header = $("<h1>Many Facts About One Number</h1>");

    $main.append($header);

    for (let fact of facts) {
        const $div = $(`<div>${fact}</div>`);
        $main.append($div);
    }
}

displayFactsAboutNumbers([7, 8, 9]);
displayFactsAboutNumber(8, 4);
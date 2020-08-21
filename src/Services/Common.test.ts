import {prepareUrl} from './Common';

test('Get ID', () => {
    const number = prepareUrl("https://site.com/1/");
    expect(number).toBe(1);
});

test('Get id of regular URL', () => {
    const number = prepareUrl("https://site.com/test/9/");
    expect(number).toBe(9);
});

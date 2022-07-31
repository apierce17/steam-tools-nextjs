const apikey = process.env.REACT_APP_API_KEY_1;
const url = `https://call-of-duty-modern-warfare.p.rapidapi.com/warzone-matches/Amartin743/psn`;

const fetchInfo = async() => {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
};

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'a7ba583b1fmshb1572cef8ef48d8p16cc3ajsne58265f22cab',
		'X-RapidAPI-Host': 'call-of-duty-modern-warfare.p.rapidapi.com'
	}
};

export default async function handler(req : any, res : any) {
    const result = await fetchInfo();
    console.log(result);
    res.status(200).json(result);
}
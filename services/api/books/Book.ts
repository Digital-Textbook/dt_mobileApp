import axios from 'axios';

const getPDF = async (url: string) => {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    return response.data;
  } catch (error) {
    throw new Error('Failed to load PDF');
  }
};

export default getPDF;

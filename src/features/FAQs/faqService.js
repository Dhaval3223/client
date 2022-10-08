import axios from 'axios';

const API_URL = '/api/faq/';

//create faqs
const createFAQ = async (faqData, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`
    }
  }

  const response = await axios.post(API_URL, faqData, config);

  return response.data;
}

//create faqs
const getFAQs = async (token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(API_URL, config);

  return response.data;
}

//delete faqs
const deleteFAQ = async (faqID, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`
    }
  }

  const response = await axios.delete(API_URL + faqID, config);

  return response.data;
}

const faqService = {
  createFAQ,
  getFAQs,
  deleteFAQ,
}

export default faqService;
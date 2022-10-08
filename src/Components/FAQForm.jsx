import React, { useState} from 'react';
import  { useDispatch } from 'react-redux';
import { createFAQ } from '../features/FAQs/faqSlice'


function FAQForm() {
  const [data, setData] = useState({
    category: '',
    question: '',
    answer: '',
  })

  const dispatch = useDispatch();

  const onSubmit = e => {
    e.preventDefault();
    dispatch(createFAQ({ data }));
    setData({
      question: '',
      answer: '',
    });
  }

  const onChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input 
            type="text" 
            id="category" 
            name="category" 
            value={data.category} 
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="question">Question</label>
          <input 
            type="text" 
            id="question" 
            name="question" 
            value={data.question} 
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="answer">Answer</label>
          <input 
            type="text" 
            id="answer" 
            name="answer" 
            value={data.answer} 
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add FAQ
          </button>
        </div>
      </form>
    </section>
  )
}

export default FAQForm
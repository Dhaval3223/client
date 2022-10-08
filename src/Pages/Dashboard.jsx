import React, { useEffect, useState }  from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Faq from "react-faq-component";
import FAQForm from "../Components/FAQForm";
import Sppinner from "../Components/Sppinner";
import { getFAQs, reset } from "../features/FAQs/faqSlice";
import { deleteFAQ } from "../features/FAQs/faqSlice";

const styles = {
  // bgColor: 'white',
  // titleTextColor: "blue",
  // rowTitleColor: "blue",
  // rowContentColor: 'grey',
  arrowColor: "red",
};

const config = {
  // animate: true,
  // arrowIcon: "V",
  // openOnload: 0,
  // expandIcon: "+",
  // collapseIcon: "-",
};

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState();

  const { user } = useSelector(state => state.auth);
  const { FAQs, isLoading, isError, isSuccess, message } 
    = useSelector(state => state.FAQ);

    useEffect(() => {
      const QueAns = FAQs.map(item => {
        return {
          title: item.question,
          content: <p className="faq">{item.answer}<button className="close" onClick={() => dispatch(deleteFAQ(item._id))}>X</button></p>,
        }
      });
      setData(QueAns)
    }, [FAQs]);

  useEffect(() => {
    if (isError) console.log(message);
  
    if (!user) navigate('/login');

    dispatch(getFAQs());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate])

  return isLoading ? <Sppinner /> : (
    <>
      <section className="heading">
        {FAQs.length > 0 ?
          <Faq
          data={{
            title: 'FAQs',
            rows: data
          }}
          styles={styles}
          config={config}
          /> :
          <h3>OOPS! No FAQs yet.</h3>}
      </section>
      <FAQForm />
    </>
  )
}

export default Dashboard
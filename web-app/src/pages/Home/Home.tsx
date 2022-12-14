import styles from "./Home.module.scss";
import Wilder from "../../components/Wilder/Wilder";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import { Link } from "react-router-dom";
import { fetchWilders } from "./rest";
import { toast, ToastContainer } from "react-toastify";
import { getErrorMessage } from "../../utils";
import { WilderType } from "../../types";
import { gql, useQuery } from "@apollo/client";

const GET_WILDERS = gql`
  query GetWilders {
    wilders {
      id
      firstname
      lastname
      school {
        id
        schoolName
      }
      skills {
        id
        skillName
      }
    }
  }
`;

const Home = () => {
  /*   const [wilders, setWilders] = useState<null | WilderType[]>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const wilders = await fetchWilders();
        setWilders(wilders);
      } catch (error) {
        toast.error(getErrorMessage(error), {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
 */

  const { data, loading, error, refetch } = useQuery(GET_WILDERS);

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2>Wilders</h2>
        <Link className={`${styles.link} ms-3`} to="/create-wilder">
          <button className={styles.button}>
            Add <i className="bi bi-plus-circle"></i>
          </button>
        </Link>
      </div>

      {loading ? (
        <Loader />
      ) : data.wilders?.length ? (
        <section className={styles.cardRow}>
          {data.wilders?.map((wilder: WilderType) => (
            <Wilder
              key={wilder.id}
              firstname={wilder.firstname}
              lastname={wilder.lastname}
              skills={wilder.skills}
              school={wilder.school}
            />
          ))}
        </section>
      ) : (
        <p>Oops... It seems that no wilder has been found !</p>
      )}
      <ToastContainer />
    </>
  );
};

export default Home;

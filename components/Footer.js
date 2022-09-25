import styles from "../scss/components/footer.module.scss";
import Link from "next/link";

function Footer({ }) {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.links_whole_container}>
                    <div className={styles.links_container}>
                        <h3>Quick Links</h3>
                        <ul className={styles.link_list}>
                            <li>
                                <Link href="/en">
                                    <a>Home</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/en/movie/popular">
                                    <a>Popular Movies</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/en/tv/popular">
                                    <a>Popular Shows</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/en/torrent">
                                    <a>Torrents</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/en/search">
                                    <a>Advanced Search</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.links_container}>
                        <h3>Genres</h3>
                        <ul className={styles.link_list}>
                            <li>
                                <Link href="#action">
                                    <a>Action</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="#adventure">
                                    <a>Adventure</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="#animation">
                                    <a>Animation</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="#crime">
                                    <a>Crime</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="#family">
                                    <a>Family</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="#horror">
                                    <a>Horror</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="#see-more">
                                    <a>See more</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.links_container}>
                        <h3>Company</h3>
                        <ul className={styles.link_list}>
                            <li>
                                <Link href="#about-us">
                                    <a>About us</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="mailto:zflix.contact@protonmail.com">
                                    <a>Contact</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="#feedback">
                                    <a>Feedback</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="#faqs">
                                    <a>FAQs</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="#terms-and-conditions">
                                    <a>Terms and conditions</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={styles.app_extra_container}>
                    <div className={styles.app_info}>
                        <div className={styles.app_logo_container}>
                            <img
                                className={styles.app_logo}
                                src="/assets/zflix-logo.png"
                                alt=""
                                srcSet=""
                            />
                        </div>
                        <div className={styles.app_name}>ZFlix</div>
                    </div>
                    <div className={styles.contact_us_container}>
                        <p>Follow us</p>
                        <div className={styles.contact_us}>
                            <div className={styles.contact_us_list}>
                                <Link href="mailto:zflix.contact@protonmail.com">
                                    <a>
                                        <div className={styles.c_container}>
                                            <i className="bi bi-envelope"></i>
                                        </div>
                                    </a>
                                </Link>
                                <div className={styles.c_container}>
                                    <i className="bi bi-twitter"></i>
                                </div>
                                <div className={styles.c_container}>
                                    <i className="bi bi-facebook"></i>
                                </div>
                                <div className={styles.c_container}>
                                    <i className="bi bi-instagram"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.download_container}>
                        <p>Download ZFlix app on</p>
                        <a
                            href="/apk/ZFlix-v4.0.2.apk"
                            download
                        >
                            <button className={styles.app_container}>
                                <span className={styles.text}>
                                    <span className={styles.row_1}>Android</span>
                                </span>
                                <span className={styles.icon}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-download"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                                    </svg>
                                </span>
                            </button>
                        </a>
                    </div>
                    <div className={styles.copy_container}>
                        <div className={styles.copyrights}>
                            <p>
                                Powered by{" "}
                                <a href="https://www.themoviedb.org/" target={"_blank"}>
                                    <img width={100} src="/assets/tmdb.svg"></img>
                                </a>
                            </p>
                        </div>
                        <div className={styles.copyrights}>
                            <p>&copy;2022 . All rights reserved</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

{
    /*<div className={styles.row_1}>
                          <a
                              href="https://zflix-backend.herokuapp.com/api/v2/zflix/latest-version"
                              target={"_blank"}
                          >
                              <button className={styles.app_container}>
                                  <span className={styles.text}>
                                      <span className={styles.row_1}>Download</span>
                                      <span className={styles.row_2}>for Android</span>
                                  </span>
                                  <span className={styles.icon}>
                                      <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="16"
                                          height="16"
                                          fill="currentColor"
                                          className="bi bi-download"
                                          viewBox="0 0 16 16"
                                      >
                                          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                          <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                                      </svg>
                                  </span>
                              </button>
                          </a>
                          <div className={styles.contact_us}>
                              <div className={styles.contact_us_list}>
                                  <Link href="mailto:zflix.contact@protonmail.com">
                                      <div className={styles.c_container}>
                                          <i className="bi bi-envelope"></i>
                                      </div>
                                  </Link>
                                  <div className={styles.c_container}>
                                      <i className="bi bi-twitter"></i>
                                  </div>
                                  <div className={styles.c_container}>
                                      <i className="bi bi-facebook"></i>
                                  </div>
                                  <div className={styles.c_container}>
                                      <i className="bi bi-instagram"></i>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className={styles.copyrights_container}>
                          <div className={styles.copyrights}>
                              <p>
                                  &copy;{new Date().getFullYear()} . All rights reserved . Privacy
                                  Policy
                              </p>
                          </div>
                      </div>*/
}

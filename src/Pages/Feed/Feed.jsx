import React, { useEffect, useState } from "react";
import "./Feed.css";
import Header from "../../Components/Header/Header";
import emptyCard from "../../Assests/images/empty-feed-card.webp";
import { AiFillHeart, AiOutlineClose, AiOutlineHeart } from "react-icons/ai";
import { LuSend } from "react-icons/lu";
import { BsSearch } from "react-icons/bs";
import { BiMessageRounded } from "react-icons/bi";
import {
  RiCloseFill,
  RiPlayFill,
  RiPlayList2Fill,
  RiShareForwardLine,
} from "react-icons/ri";
import { FaEarthAsia } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";
import { MdCheckCircle, MdHideSource } from "react-icons/md";
import {
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { toast } from "react-toastify";
import {
  getFilterPost,
  getSinglePost,
  saveLikes,
  savePostComments,
  updateBlockPost,
  updatePostReport,
} from "../../Api/feed";
import { timeCal } from "../../Utils/DateFormat";
import { Link, useNavigate } from "react-router-dom";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { FiAlertCircle } from "react-icons/fi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getUserId } from "../../Utils/Storage";
import { getsingleuser } from "../../Api/user";

const UserHome = () => {
  const [postNext, setPostNext] = useState(0);
  const [scroll, setScroll] = useState(false);
  const [reload, setReload] = useState(false);
  const [count, setCount] = useState(0);
  const [post, setPost] = useState([]);
  const [postDelete, setPostDelete] = useState(false);
  const [modify, setModify] = useState(false);
  const [postLikes, setPostLikes] = useState("");
  const [openComments, setOpenComments] = useState(false);
  const [message, setMessage] = useState("");
  const [share, setShare] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [content, setContent] = useState("");
  const [openReport, setOpenReport] = useState(false);
  const [report, setReport] = useState({});
  const [openDescription, setOpenDescription] = useState(false);
  const [submitReport, setSubmitReport] = useState(false);
  const [reportId, setReportId] = useState("");
  const [reportResponse, setReportResponse] = useState(false);
  const [hide, setHide] = useState(false);
  const [hideId, setHideId] = useState("");
  const [user, setUser] = useState();
  const [userId, setUserId] = useState();
  const [currentView, setCurrentView] = useState("feed");
  const [hover, setHover] = useState("");
  const [deletePlay, setDeletePlay] = useState(false);
  const [playDeleteId, setPlayDeleteId] = useState("");
  const [playDelete, setPlayDelete] = useState(false);
  const navigate = useNavigate();
  const [playList, setPlayList] = useState([]);
  const [playNext, setPlayNext] = useState(0);
  const [playScroll, setPlayScroll] = useState(false);
  const [playReload, setPlayReload] = useState(false);
  const [playListCount, setPlayListCount] = useState(0);

  useEffect(() => {
    const user = getUserId();
    setUserId(user);
    window.addEventListener("scroll", handleScroll);
    getUserDetails();
  }, []);

  useEffect(() => {
    getFilterPostList();
  }, [postNext]);

  useEffect(() => {
    const handleScrollEvent = (event) => {
      if (currentView === "feed") {
        handleScroll(event);
      } else {
        handlePlayScroll(event);
      }
    };
    window.addEventListener("scroll", handleScrollEvent);
    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
  }, [currentView]);

  const handleScroll = () => {
    const value =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 800;
    setScroll(value);
  };
  useEffect(() => {
    if (scroll) {
      loadMorePost();
    }
  }, [scroll]);

  const loadMorePost = () => {
    let nextPost = postNext;
    if (postDelete) {
      nextPost = nextPost + 4;
      setPostDelete(false);
    } else {
      nextPost = nextPost + 5;
    }
    if (count <= nextPost) {
      setReload(true);
    } else {
      setPostNext(nextPost);
    }
  };

  const getUserDetails = () => {
    const data = getUserId();
    getsingleuser(data)
      .then((res) => {
        const result = res?.data?.result;
        setUser(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getFilterPostList = () => {
    const data = {
      limit: 5,
      page: postNext,
    };
    getFilterPost(data)
      .then((res) => {
        const postList = res?.data?.result?.postList;
        setCount(res?.data?.result?.postCount);
        if (modify) {
          setPost(postList);
          setModify(false);
        } else {
          setPost([...post, ...postList]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePlayScroll = () => {
    const value =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 800;
    setPlayScroll(value);
  };

  useEffect(() => {
    if (playScroll) {
      loadMorePlay();
    }
  }, [playScroll]);

  const loadMorePlay = () => {
    let nextPlay = playNext;
    if (playDelete) {
      nextPlay = nextPlay + 9;
      setPlayDelete(false);
    } else {
      nextPlay = nextPlay + 10;
    }
    if (playListCount <= nextPlay) {
      setPlayReload(true);
    } else {
      setPlayNext(nextPlay);
    }
  };

  const singlePost = (postId) => {
    getSinglePost(postId)
      .then((res) => {
        const result = res?.data?.result;
        const data = post.map((item) =>
          item._id === result?._id
            ? {
                ...item,
                likeCount: result?.likeCount,
                likes: result?.likes,
                commentCount: result?.commentCount,
                comment: result?.comment,
              }
            : item
        );
        setPost(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const savePostLikes = (postId, like) => {
    if (like === "add") {
      setPostLikes(postId);
    } else {
      setPostLikes("");
    }
    const data = {
      _id: postId,
      likes: {
        user: userId,
        modelType: "User",
      },
    };
    saveLikes(data)
      .then((res) => {
        singlePost(postId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleMessage = (event) => {
    setMessage(event?.target?.value);
  };

  const getPostCommentsList = (commentId) => {
    if (openComments === commentId) {
      setOpenComments("");
    } else {
      setOpenComments(commentId);
    }
  };

  const handleComments = (id) => {
    if (message) {
      const data = {
        _id: id,
        comment: {
          comments: message,
          user: userId,
          modelType: "User",
        },
      };
      savePostComments(data)
        .then((res) => {
          setMessage("");
          singlePost(id);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.warning("Please enter the comment");
    }
  };

  const openSharePopup = (url, content) => {
    setShareUrl(url);
    setContent(content);
    setShare(true);
  };
  const closeSharePopup = () => {
    setShare(false);
  };

  const handleHidePost = () => {
    const data = { _id: hideId, block: { user: userId, modelType: "User" } };
    updateBlockPost(data)
      .then((res) => {
        closeHidePopup();
        toast.success(res?.data?.message);
        const newPostList = post.filter((x) => x._id !== hideId);
        setPost(newPostList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openHidePopup = (hideId) => {
    setHideId(hideId);
    setHide(true);
  };
  const closeHidePopup = () => {
    setHide(false);
  };

  const openReportPopup = (data) => {
    setReportId(data);
    setOpenReport(true);
  };
  const closeReportPopup = () => {
    setOpenReport(false);
  };

  const openDescriptionPopup = (data) => {
    setReport({ ...report, type: data });
    setSubmitReport(false);
    closeReportPopup();
    setOpenDescription(true);
  };
  const closeDescriptionPopup = () => {
    setOpenDescription(false);
  };

  const openReportResponsePopup = () => {
    setReportResponse(true);
  };
  const closeReportResponsePopup = () => {
    setReportResponse(false);
  };

  const handleDescription = (event) => {
    const description = event?.target.value;
    setReport({ ...report, description });
  };

  const handleReport = () => {
    setSubmitReport(true);
    if (report?.description) {
      const data = {
        _id: reportId,
        report: {
          user: userId,
          modelType: "User",
          type: report?.type,
          description: report?.description,
        },
      };
      updatePostReport(data)
        .then((res) => {
          closeDescriptionPopup();
          openReportResponsePopup();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleMouseOver = (data) => {
    setHover(data);
  };

  const handleMouseOut = () => {
    setHover("");
  };

  const closePlayDeletePopup = () => {
    setDeletePlay(false);
  };

  return (
    <>
      <div>
        <Header />
        <div className="container-fluid">
          <div
            className="container d-flex flex-column border-start border-end gap-2 align-items-center pt-3 p-2"
            style={{ height: "100%" }}
          >
            {currentView === "feed" ? (
              // Feed
              <div>
                {post?.length === 0 ? (
                  <div className="container  p-5 bg-white rounded">
                    <div className="text-center">
                      <BsSearch />
                    </div>
                    <div className="text-center mt-5">
                      <p className="fs-4 fw-bolder">Nothing to see here yet</p>
                      <p className="fs-6">
                        Follow people or join an organization to see <br /> more
                        posts
                      </p>
                    </div>
                    <div className="text-center">
                      <img
                        className="img-fluid"
                        src={emptyCard}
                        alt="emptyCard"
                      />
                    </div>
                  </div>
                ) : (
                  post?.map((data, index) => (
                    <div
                      key={index}
                      className="shadow border overflow-y-auto mt-3 p-2 mb-4 rounded"
                      style={{ maxWidth: "500px" }}
                    >
                      <div className="container  mt-2 p-3">
                        <div className="row  mb-2 ">
                          <div className="col-lg-2 col-2 ">
                            <img
                              className="img-fluid  rounded-circle"
                              src={
                                data?.doctorId?.profileImage ??
                                "https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png"
                              }
                              alt="avatar"
                              style={{
                                width: "3.5rem",
                                height: "3.5rem",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                          <div className=" col-lg-8 col-8 align-items-center">
                            <span className="fw-bolder">
                              <Link
                                to={{
                                  pathname: "/MasterProfile",
                                  search: `?id=${data?._id}`,
                                }}
                                className="text-decoration-none text-dark small"
                              >
                                {data?.doctorId?.doctorName}
                              </Link>
                            </span>
                            <br />
                            <small className="text-secondary d-flex gap-1 align-items-center">
                              <FaEarthAsia /> {timeCal(data?.createdOn)}
                            </small>
                          </div>
                          <div className="col-lg-1 col-2">
                            <div className="dropdown">
                              <button
                                className="btn  rounded-5 border-0"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <HiDotsVertical />
                              </button>
                              <ul className="dropdown-menu">
                                <li>
                                  <Link
                                    className="dropdown-item d-flex align-items-center"
                                    onClick={() => openHidePopup(data?._id)}
                                  >
                                    <FiAlertCircle className="me-2" /> Hide
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    className="dropdown-item d-flex align-items-center"
                                    onClick={() => openReportPopup(data?._id)}
                                  >
                                    <MdHideSource className="me-2" /> Report
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="container bg-white mb-1">
                        {data?.fileType === 1 ? (
                          <img
                            className="feedImage img-fluid"
                            src={data?.video}
                            alt="FeedImage"
                            style={{ width: "500px", height: "300px" }}
                          />
                        ) : (
                          <video
                            className="feedImage img-fluid"
                            src={data?.video}
                            controls
                            alt="FeedImage"
                            style={{ width: "500px", height: "300px" }}
                          />
                        )}
                      </div>
                      <div className="ms-2">
                        <span>
                          {data?.hashtag?.split(" ")?.map((hash, index) => (
                            <Link
                              to="/UserSearch"
                              state={hash}
                              key={index}
                              className="text-decoration-none"
                            >
                              {hash + " "}
                            </Link>
                          ))}{" "}
                          {data?.type === "article" ? (
                            <ReactQuill
                              value={data?.content}
                              theme="snow"
                              modules={{ toolbar: false }}
                              className="custom-quill-editor"
                            />
                          ) : (
                            <div> {data?.description}</div>
                          )}
                        </span>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-around align-items-center">
                        <p>
                          <button className="text-decoration-none btn border-0 text-dark d-flex align-items-center gap-2">
                            {postLikes === data?._id ||
                            data?.likes?.some((x) => x.user === userId) ? (
                              <AiFillHeart
                                color="red"
                                onClick={() =>
                                  savePostLikes(data?._id, "remove")
                                }
                              />
                            ) : (
                              <AiOutlineHeart
                                onClick={() => savePostLikes(data?._id, "add")}
                              />
                            )}
                            <span className="number">{data?.likeCount} </span>
                          </button>
                        </p>
                        <p>
                          <button
                            className="text-decoration-none btn border-0 text-dark d-flex align-items-center gap-2"
                            onClick={() => getPostCommentsList(data?._id)}
                          >
                            <BiMessageRounded /> {data?.commentCount}
                          </button>
                        </p>
                        <p>
                          <button
                            className="text-decoration-none btn border-0 text-dark d-flex align-items-center gap-2"
                            onClick={() =>
                              openSharePopup(data?.url, data?.description)
                            }
                          >
                            <RiShareForwardLine />{" "}
                          </button>
                        </p>
                      </div>

                      {openComments === data?._id ? (
                        <>
                          {data?.comment?.map((comment, index) => (
                            <div key={index} className=" mt-3 mb-3 ps-3">
                              <div className="d-flex align-items-center">
                                <img
                                  className="img-fluid rounded-circle"
                                  src={
                                    comment?.user?.image ??
                                    "https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png"
                                  }
                                  alt="avatar"
                                  style={{
                                    width: "2rem",
                                    height: "2rem",
                                    objectFit: "cover",
                                  }}
                                />
                                <div className="container rounded-4">
                                  <div className="card rounded-4 w-75 p-2">
                                    <div className="d-flex justify-content-between">
                                      <div className="d-flex align-items-center justify-content-around gap-1">
                                        <span className="fw-bolder">
                                          {comment?.user?.name}
                                        </span>
                                        <span>
                                          {timeCal(comment?.createdOn)}
                                        </span>
                                      </div>
                                    </div>
                                    {comment?.comments}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                          <div className="container p-2 d-flex align-items-center justify-content-around ">
                            <img
                              className="img-fluid rounded-circle"
                              src={
                                user?.image ??
                                "https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png"
                              }
                              alt="avatar"
                              style={{
                                width: "3rem",
                                height: "3rem",
                                objectFit: "cover",
                              }}
                            />
                            <div className=" d-flex">
                              <input
                                className="form-control messageInput"
                                type="text"
                                value={message}
                                onChange={handleMessage}
                                placeholder="Write a comment..."
                              />
                              <label className="sendIcon">
                                <Link onClick={() => handleComments(data?._id)}>
                                  <LuSend className="fs-5 text-dark " />
                                </Link>
                              </label>
                            </div>
                          </div>
                        </>
                      ) : null}
                    </div>
                  ))
                )}
                {reload ? (
                  <div className="form-text text-danger text-center mb-5">
                    No Post
                  </div>
                ) : null}
              </div>
            ) : (
              <>
                <div className="container mt-3">
                  <div className="row">
                    {playList.map((video, index) => (
                      <div
                        key={index}
                        className="col-lg-12 col-12 container mb-3 mx-auto"
                        style={{ maxWidth: "500px" }}
                      >
                        <div className="card border-0 rounded shadow">
                          <div className="card-body">
                            <div className="row align-items-center">
                              <div className="col-lg-2 col-3">
                                <img
                                  className="img-fluid  rounded-circle"
                                  src={
                                    video?.user?.image
                                      ? video?.user?.image
                                      : "https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png"
                                  }
                                  alt="avatar"
                                  style={{
                                    width: "3.5rem",
                                    height: "3.5rem",
                                    objectFit: "cover",
                                  }}
                                />
                              </div>
                              <div className=" col-lg-8 col-7 align-items-center">
                                <span className="fw-bolder">
                                  <Link
                                    to={{
                                      pathname: "/MasterProfile",
                                      search: `?id=${video?.user?._id}`,
                                    }}
                                    className="text-decoration-none text-dark small fs-5"
                                  >
                                    {video?.user?.name}
                                  </Link>
                                </span>
                                <br />
                              </div>
                            </div>
                          </div>
                          <div
                            className="card-body thumbnail-card p-2"
                            onMouseEnter={() => handleMouseOver(video?._id)}
                            onMouseLeave={handleMouseOut}
                            onClick={() =>
                              navigate(`/PlaylistView?id=${video?._id}`)
                            }
                          >
                            <img
                              alt="thumbnail"
                              className="card-img-top rounded-4  rounded-bottom-0 w-100 thumbnail-image"
                              style={{ objectFit: "cover", height: "250px" }}
                              src={video?.thumbnail}
                            />
                            <div className="small">
                              <p className="small p-1 rounded text-white playlist-thumbnail-count">
                                <RiPlayList2Fill /> {video?.postCount} videos
                              </p>
                              {hover === video?._id && (
                                <h6 className=" thumbnail-title ">
                                  <RiPlayFill className="fs-3" /> PLAY All{" "}
                                </h6>
                              )}
                            </div>
                          </div>
                          <div className="card-body mt-0 pt-0 pb-0 small">
                            <div className="d-flex flex-wrap align-items-center justify-content-lg-between justify-content-md-between justify-content-sm-between justify-content-center">
                              <div>
                                <span className="fw-bolder fs-5 text-uppercase">
                                  {video?.name}
                                </span>
                              </div>
                            </div>
                            <div className="d-flex flex-column text-lg-start text-md-start text-sm-start text-center">
                              <span className="fs-10 mb-3">
                                {timeCal(video?.createdOn)}
                              </span>
                              <p className="">{video?.description}</p>
                              <span className="fs-10 text-secondary mb-3">
                                {video?.category
                                  ?.map((x) => x.category)
                                  .join(", ")}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {playReload ? (
                    <div className="form-text text-danger text-center mb-5">
                      No PlayList
                    </div>
                  ) : null}
                </div>
              </>
            )}
          </div>
        </div>
        <Dialog open={share} fullWidth maxWidth="xs">
          <DialogTitle className="text-secondary">
            Share On Social Media
            <IconButton className="float-end" onClick={closeSharePopup}>
              <RiCloseFill />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <div className="p-4 d-flex justify-content-between">
              <WhatsappShareButton url={shareUrl} title={content}>
                <WhatsappIcon size={32} round={true} />
              </WhatsappShareButton>
              <FacebookShareButton url={shareUrl} title={content}>
                <FacebookIcon size={32} round={true} />
              </FacebookShareButton>
              <TwitterShareButton url={shareUrl} title={content}>
                <TwitterIcon size={32} round={true} />
              </TwitterShareButton>
              <TelegramShareButton url={shareUrl} title={content}>
                <TelegramIcon size={32} round={true} />
              </TelegramShareButton>
              <LinkedinShareButton url={shareUrl} title={content}>
                <LinkedinIcon size={32} round={true} />
              </LinkedinShareButton>
              <EmailShareButton url={shareUrl} title={content}>
                <EmailIcon size={32} round={true} />
              </EmailShareButton>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog open={hide}>
          <DialogContent>
            <div className="text-center m-4">
              <h5 className="mb-4">
                Are you sure you want to hide <br /> the selected Post ?
              </h5>
              <button
                type="button"
                className="btn btn-primary mx-3"
                onClick={handleHidePost}
              >
                Yes
              </button>
              <button
                type="button"
                className="btn btn-light "
                onClick={closeHidePopup}
              >
                No
              </button>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog open={openReport} fullWidth maxWidth="xs">
          <DialogTitle>
            Report
            <IconButton className="float-end" onClick={closeReportPopup}>
              <AiOutlineClose />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <div className="report">
              <h6>Report this Post</h6>
              <span>
                Help us understand what's happening with this post. How would
                you describe it?
              </span>
              <ul className="mt-2">
                <li>
                  {" "}
                  <span
                    onClick={() => openDescriptionPopup("Misleading or scam")}
                  >
                    Misleading or scam{" "}
                  </span>{" "}
                </li>
                <li>
                  {" "}
                  <span
                    onClick={() =>
                      openDescriptionPopup("Sexually inappropriate")
                    }
                  >
                    {" "}
                    Sexually inappropriate{" "}
                  </span>
                </li>
                <li>
                  <span onClick={() => openDescriptionPopup("Offensive")}>
                    Offensive
                  </span>
                </li>
                <li>
                  <span onClick={() => openDescriptionPopup("Violence")}>
                    Violence
                  </span>
                </li>
                <li>
                  <span
                    onClick={() => openDescriptionPopup("Prohibited content")}
                  >
                    Prohibited content
                  </span>{" "}
                </li>
                <li>
                  <span onClick={() => openDescriptionPopup("Spam")}>
                    Spam{" "}
                  </span>{" "}
                </li>
                <li>
                  <span onClick={() => openDescriptionPopup("False news")}>
                    False news{" "}
                  </span>
                </li>
                <li>
                  <span
                    onClick={() =>
                      openDescriptionPopup("Political candidate or issue")
                    }
                  >
                    Political candidate or issue{" "}
                  </span>{" "}
                </li>
                <li>
                  <span onClick={() => openDescriptionPopup("Other")}>
                    Other
                  </span>
                </li>
              </ul>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog open={openDescription} fullWidth maxWidth="sm">
          <DialogTitle>
            Report
            <IconButton className="float-end" onClick={closeDescriptionPopup}>
              <AiOutlineClose />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="form-group">
                  <label className="mb-2">Description</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    onChange={handleDescription}
                    name="description"
                    placeholder="Description"
                  ></textarea>
                  {!report?.description && submitReport ? (
                    <span className="form-text text-danger">
                      This field is required.
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="float-end mt-3">
              <button
                type="button"
                className="btn btn-primary mx-3"
                onClick={handleReport}
              >
                Submit
              </button>
              <button
                type="button"
                className="btn btn-light "
                onClick={closeDescriptionPopup}
              >
                Cancel
              </button>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog open={reportResponse} fullWidth maxWidth="xs">
          <DialogTitle className="p-0">
            <IconButton
              className="float-end m-2"
              onClick={closeReportResponsePopup}
            >
              <AiOutlineClose />
            </IconButton>
          </DialogTitle>
          <DialogContent className="responseModal">
            <span>
              <MdCheckCircle size={"3rem"} color="green" />
            </span>
            <h5 className="mt-2">Thank you for submitting a report.</h5>
            <div className="my-2">
              <Chip
                color="primary"
                variant="outlined"
                label={report?.type}
              ></Chip>
            </div>
            <span>
              We'll let you know when there's an update on this report.
            </span>
          </DialogContent>
        </Dialog>
        <Dialog open={deletePlay}>
          <DialogContent>
            <div className="text-center m-4">
              <h5 className="mb-4">
                Are you sure you want to Delete <br /> the selected Playlist ?
              </h5>

              <button
                type="button"
                className="btn btn-light "
                onClick={closePlayDeletePopup}
              >
                No
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default UserHome;

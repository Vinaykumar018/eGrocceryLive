import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import api from "../../api/api";
import { useSelector } from "react-redux";
import UploadPhoto from "../../utils/UploadPhoto.svg";
import { LuStar } from "react-icons/lu";
import "./rateproduct.css";

const RateProductModal = (props) => {
    const { t } = useTranslation();
    const user = useSelector(state => state.user);
    const [activeIndex, setActiveIndex] = useState(null);
    const [files, setFiles] = useState([]);
    const [review, setReview] = useState("");

    const handleActive = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    const handleFileUpload = (e) => {
        const newFileArray = Array.from(e.target.files);
        const allowedFiles = ["image/png", "image/jpg", "image/jpeg"];
        const validFiles = newFileArray.filter((file) => allowedFiles.includes(file.type));
        setFiles(prevFiles => [...prevFiles, ...validFiles]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (activeIndex === null) {
            toast.error(t("product_rating_is_required"));
            return;
        }
        try {
            const response = await api.addProductRating(user?.jwtToken, props.product_id, activeIndex, review, files);
            const result = await response.json();
            props.setShowPdtRatingModal(false);
            toast[result.message === "The image.0 must be an image." ? "error" : "success"](result.message);
            setActiveIndex(null);
            setReview ("");
            setFiles([]);
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleReviewChange = (e) => {
        setReview(e.target.value);
    };

    const handleUploadedFileDelete = (imageName) => {
        setFiles(files.filter((file) => file?.name !== imageName));
    };

    return (
        <Modal
            size="md"
            centered
            className="rateProductModal"
            show={props.showPdtRatingModal}
            backdrop={"static"}
        >
            <Modal.Header className="d-flex justify-content-between">
                <div className="d-flex justify-content-between align-items-center">
                    <h2 className="modalHeading">{t("rate_the_product")}</h2>
                </div>

                <div>
                    <button type="button"
                        onClick={() => {
                            props.setShowPdtRatingModal(false);
                            setActiveIndex(null);
                            setReview(null);
                            setFiles(null);
                        }}>
                        <AiOutlineCloseCircle size={30} className="crossLogo" />
                    </button>
                </div>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit} className="rateForm">
                    <div className="container mb-5">
                        <p className="modalSubHeading">{t("overall_rating")} :</p>
                        <div className="d-flex justify-content-around gap-5">
                            <div className="starBackground">
                                <LuStar className={`star ${activeIndex >= 1 ? "active " : ""}`} onClick={() => handleActive(1)} />
                            </div>
                            <div className="starBackground">
                                <LuStar className={`star ${activeIndex >= 2 ? "active " : ""}`} onClick={() => handleActive(2)} />
                            </div>
                            <div className="starBackground">
                                <LuStar className={`star ${activeIndex >= 3 ? "active " : ""}`} onClick={() => handleActive(3)} />
                            </div>
                            <div className="starBackground">
                                <LuStar className={`star ${activeIndex >= 4 ? "active " : ""}`} onClick={() => handleActive(4)} />
                            </div>
                            <div className="starBackground">
                                <LuStar className={`star ${activeIndex >= 5 ? "active " : ""}`} onClick={() => handleActive(5)} />
                            </div>
                        </div>
                    </div>
                    <div className="container mt-2">
                        <p className="modalSubHeading">{t("product_review")} :</p>
                        <textarea
                            required
                            name="productReview"
                            className="reviewTextArea"
                            rows={2}
                            placeholder={t("write_review_here")}
                            onChange={handleReviewChange}
                        />
                    </div>
                    <div className="container mt-2">
                        <p className="modalSubHeading">{t("add_photos")}:</p>
                        <div className="d-flex flex-row flex-wrap justify-content-start">
                            {files?.map((image) => (
                                <div key={image?.name} className="uploadedImagesContainer">
                                    <img className="uploadedImages" src={URL.createObjectURL(image)} alt="uploadedImage" loading="lazy" />
                                    <div className="deleteUploaded d-flex justify-content-center align-items-center"
                                        onClick={() => handleUploadedFileDelete(image?.name)}
                                    >x</div>
                                </div>
                            ))}
                        </div>
                        <label htmlFor="fileInput" className="modalSubHeading">
                            <div className="uploadContainer">
                                <img src={UploadPhoto} alt="uploadImage" className="placeHolderImage" />
                                <input
                                    type="file"
                                    accept=".jpg, .png, .jpeg"
                                    id="fileInput"
                                    className="file-input"
                                    multiple
                                    onChange={handleFileUpload}
                                    aria-placeholder="Upload" />
                            </div>
                        </label>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-end w-100 mt-1">
                        <button type="submit" className="submitRating">
                            {t("submit_review")}
                        </button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default RateProductModal;
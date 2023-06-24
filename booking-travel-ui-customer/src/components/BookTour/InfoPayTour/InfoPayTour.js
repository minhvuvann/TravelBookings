import React, {useContext} from "react";

import classNames from "classnames/bind";
import styles from "./InfoPay.module.scss";
import {Box,} from "@mui/material";
import MoneyUtils from "~/utils/MoneyUtils";

const cx = classNames.bind(styles);
const InfoPayTour = (props) => {
    const {tourBookedInfo} = props;
    return (
        <div className={cx("cusInfobookedTour")}>
            <Box sx={{width: '100%',}} className={cx('box-infoBooked')}>
                <div className={cx('info-header')}>
                    <h4>Thanh toán</h4>
                </div>
                <div className={cx('info-content')}>
                    <p>Phương thức thanh
                        toán: <span>{tourBookedInfo?.paymentMethod === 'QR' ? 'Quét mã QR' : 'Thanh toán tại văn phòng'}</span>
                    </p>
                    <p style={{color: 'red'}}>{tourBookedInfo?.paymentMethod === 'QR' ? 'Đã thanh toán' : 'Chưa thanh toán'}</p>
                    <p>Số tiền thanh toán còn lại
                        : <span>{MoneyUtils.getMoney(tourBookedInfo?.totalPrice?.amount)} VND</span></p>
                </div>
            </Box>
        </div>
    );
};

export default InfoPayTour;

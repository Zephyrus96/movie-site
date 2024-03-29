import React from "react";
import "./loading.css";

const LoadingIcon = () => {
    return (
        <div className="loading__icon">
            <svg width="175px"  height="175px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" className="lds-ripple" style={{background: "none"}}><circle cx="50" cy="50" r="22.1552" fill="none" ng-attr-stroke="{{config.c1}}" ng-attr-stroke-width="{{config.width}}" stroke="#000000" strokeWidth="2"><animate attributeName="r" calcMode="spline" values="0;35" keyTimes="0;1" dur="2" keySplines="0 0.2 0.8 1" begin="-1s" repeatCount="indefinite"></animate><animate attributeName="opacity" calcMode="spline" values="1;0" keyTimes="0;1" dur="2" keySplines="0.2 0 0.8 1" begin="-1s" repeatCount="indefinite"></animate></circle><circle cx="50" cy="50" r="34.9424" fill="none" ng-attr-stroke="{{config.c2}}" ng-attr-stroke-width="{{config.width}}" stroke="#1b5f27" strokeWidth="2"><animate attributeName="r" calcMode="spline" values="0;35" keyTimes="0;1" dur="2" keySplines="0 0.2 0.8 1" begin="0s" repeatCount="indefinite"></animate><animate attributeName="opacity" calcMode="spline" values="1;0" keyTimes="0;1" dur="2" keySplines="0.2 0 0.8 1" begin="0s" repeatCount="indefinite"></animate></circle></svg>
        </div>
    );
}

export default LoadingIcon;


import { useEffect } from "react";
import RequestItem from "./RequestItem"

const RequestModal = ({closeModal, requestData, deleteRequest , manageFriend}) => {
    useEffect(() => {
    }, [requestData])

    return(
        <div className="RequestModal">
            <div className="friend_modal_title">친구 요청</div>
                    <div><button className="btn_modal_close" onClick={closeModal}>×</button></div>
                    <div className="request_list_wrapper">
                    { !requestData || requestData.length === 0 ?
                    <p>받은 요청이 없습니다</p> :
                    requestData.map((it) => (                            
                        <RequestItem
                            key={it.id}
                            {...it}
                            onAccept={manageFriend}
                            onDelete={deleteRequest}
                        />
                    ))}
                    </div>            
        </div>
    )
}

export default RequestModal;
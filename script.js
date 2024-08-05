document.addEventListener('DOMContentLoaded', function() {
    const readNFCBtn = document.getElementById('readNFC');
    const quickLoginBtn = document.getElementById('quickLogin');
    const composeEmailBtn = document.getElementById('composeEmail');
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const closeBtn = document.getElementsByClassName('close')[0];

    readNFCBtn.addEventListener('click', readNFCTag);
    quickLoginBtn.addEventListener('click', quickLogin);
    composeEmailBtn.addEventListener('click', composeEmail);
    closeBtn.addEventListener('click', closeModal);

    checkNFCSupport();

    async function readNFCTag() {
        if ('NDEFReader' in window) {
            const ndef = new NDEFReader();
            try {
                showModal("Đọc thẻ NFC", "<span class='loading'></span>Đang đọc thẻ NFC...");
                await ndef.scan();
                ndef.onreading = event => {
                    const decoder = new TextDecoder();
                    for (const record of event.message.records) {
                        showSuccess("Đã đọc dữ liệu NFC: " + decoder.decode(record.data));
                    }
                }
            } catch (error) {
                showError("Lỗi khi đọc thẻ NFC: " + error);
            }
        } else {
            showError("Trình duyệt của bạn không hỗ trợ NFC");
        }
    }

    function quickLogin(event) {
        event.preventDefault();
        const emailUrl = quickLoginBtn.getAttribute('href');
        showModal("Đăng nhập nhanh", "<span class='loading'></span>Đang chuyển hướng đến trang đăng nhập email...");
        
        setTimeout(() => {
            window.location.href = emailUrl;
        }, 1000);
    }

    function composeEmail(event) {
        event.preventDefault();
        const composeUrl = composeEmailBtn.getAttribute('href');
        showModal("Soạn thư nhanh", "<span class='loading'></span>Đang chuyển hướng đến trang soạn thư mới...");
        
        setTimeout(() => {
            window.location.href = composeUrl;
        }, 1000);
    }

    function showModal(title, content) {
        modalTitle.textContent = title;
        modalContent.innerHTML = content;
        modal.style.display = "block";
    }

    function closeModal() {
        modal.style.display = "none";
    }

    function showError(message) {
        showModal("Lỗi", message);
    }

    function showSuccess(message) {
        showModal("Thành công", message);
    }

    function checkNFCSupport() {
        if ('NDEFReader' in window) {
            console.log("Thiết bị này hỗ trợ NFC");
        } else {
            console.log("Thiết bị này không hỗ trợ NFC");
            readNFCBtn.disabled = true;
            readNFCBtn.textContent = "NFC không được hỗ trợ";
        }
    }

    // Đóng modal khi click bên ngoài
    window.onclick = function(event) {
        if (event.target == modal) {
            closeModal();
        }
    }
});
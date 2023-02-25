$(document).ready(function() {
    "use strict";
    /*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
    // Đối tượng dùng chung Size Pizza
    var gSelectedPizzaSizeMenu = {
            kichCo: "",
            duongKinh: "",
            suon: "",
            salad: "",
            soLuongNuoc: "",
            giaTien: ""
        }
        // đối tuọng dùng cho Pizza Type
    var gSelectedPizzaType = {
            pizzaType: ""
        }
        // đối tượng dùng cho Thông tin Order
    var gInfoOrder = {
            fullName: "",
            email: "",
            phone: "",
            address: "",
            maGiamGia: "",
            message: ""
        }
        // đối tượng lưu thông tin voucher
    var gVoucher;
    // đối tượng lưu tất cả thông tin
    var gObjectRequest = {
        kichCo: "",
        duongKinh: "",
        suon: "",
        salad: "",
        loaiPizza: "",
        idVourcher: "",
        idLoaiNuocUong: "",
        soLuongNuoc: "",
        hoTen: " ",
        thanhTien: "",
        email: "",
        soDienThoai: "",
        diaChi: "",
        loiNhan: ""
    }
    var gOrderId;

    /*** REGION 2 - Vùng gán / thực thi hàm xử lý sự kiện cho các elements */
    onPageLoading();
    // Gán sự kiện  Nút ở Pizza Size Small S
    $("#small-btn").on("click", function() {
        onBtnSmallSizePizzaClick();
    });
    // Gán sự kiện  Nút ở Pizza Size Lage M
    $("#medium-btn").on("click", function() {
        onBtnMediumSizePizzaClick();
    });
    // Gán sự kiện  Nút ở Pizza Size Small
    $("#large-btn").on("click", function() {
        onBtnLargeSizePizzaClick();
    });


    // ------------------------------
    // gan su kien BUTTON  Pizza type  OCEAN MANIA click
    $("#btn-seafood").on("click", function() {
        onBtnPizzaTypeSeafoodClick();
    });
    // gan su kien BUTTON  Pizza type  HAWAIIAn click
    $("#btn-hawai").on("click", function() {
        onBtnPizzaTypeHawaiClick();
    });
    // gan su kien BUTTON  Pizza type  BACCON click
    $("#btn-bacon").on("click", function() {
        onBtnPizzaTypeBacconClick();
    });
    // =========================
    // gan su kien nut Kiem tra Don

    $("#btn-kiemtradon").on("click", function() {
        onBtnKiemTraDonClick();
    });
    /// gán sự kiện cho nút tạo đơn
    $("#btn-confirm").on("click", function() {
        onBtnTaoDonClick();
    });

    /*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */
    // Ham khi Loadtrang
    function onPageLoading() {
        callApiGetDrinks();
    }
    // hàm xử lí khi nút Chọn Small Pizza Size Click
    function onBtnSmallSizePizzaClick() {
        var vSelectedChoiceStructure = getPlan("S", "20cm", 2, "200g", 2, 150000);
        changeColorButtonSizePizza("S");
        gSelectedPizzaSizeMenu = vSelectedChoiceStructure;
        console.log(gSelectedPizzaSizeMenu);
    }
    // hàm xử lí khi nút Chọn Medium Pizza Size Click
    function onBtnMediumSizePizzaClick() {
        var vSelectedChoiceStructure = getPlan("M", "25cm", 4, "300g", 3, 200000);
        changeColorButtonSizePizza("M");
        gSelectedPizzaSizeMenu = vSelectedChoiceStructure;
        console.log(gSelectedPizzaSizeMenu);
    }
    // hàm xử lí khi nút Chọn Small Pizza Size Click
    function onBtnLargeSizePizzaClick() {
        var vSelectedChoiceStructure = getPlan("L", "30cm", 8, "500g", 4, 250000);
        changeColorButtonSizePizza("L");
        gSelectedPizzaSizeMenu = vSelectedChoiceStructure;
        console.log(gSelectedPizzaSizeMenu);
    }


    // Ham xu li khi nut OCEAN MANIA click
    function onBtnPizzaTypeSeafoodClick() {
        var vSelectedOrderPizzaType = getPizzaType("seafood");
        changeColorButtonTypePizza("seafood");
        gSelectedPizzaType = vSelectedOrderPizzaType;
        console.log(gSelectedPizzaType);
    }
    // Ham xu li khi nut HAWAII click
    function onBtnPizzaTypeHawaiClick() {
        var vSelectedOrderPizzaType = getPizzaType("hawaii");
        changeColorButtonTypePizza("hawaii");
        gSelectedPizzaType = vSelectedOrderPizzaType;
        console.log(gSelectedPizzaType);
    }
    // Ham xu li khi nut BACCON click
    function onBtnPizzaTypeBacconClick() {
        var vSelectedOrderPizzaType = getPizzaType("baccon");
        changeColorButtonTypePizza("baccon");
        gSelectedPizzaType = vSelectedOrderPizzaType;
        console.log(gSelectedPizzaType);
    }

    // ham xu li khi nut kiem tra don click
    function onBtnKiemTraDonClick() {
        // tao doi tuong dung chung
        var vInfoOrder = {
                fullName: "",
                email: "",
                phone: "",
                address: "",
                maGiamGia: "",
                message: ""
            }
            //1: doc du lieu
        readInfoOrderForm(vInfoOrder);
        // 2: validate
        var vIsCheck = validateData(vInfoOrder);
        if (vIsCheck) {
            /// 3: xu li khi khi validate thanh cong
            gInfoOrder = vInfoOrder;
            // ghi tat ca du lieu ra modal
            handlerDataToFormModal(gInfoOrder, gSelectedPizzaSizeMenu, gSelectedPizzaType);
            // hien madal
            $("#order-modal").modal("show");
        }

    }

    // ham xu li khi nut TAO DON duoc an
    function onBtnTaoDonClick() {

        // 1: doc du lieu
        readAllRequest(gObjectRequest);
        // 2: validate
        var vIsCheck = validateObjectRequest(gObjectRequest);
        if (vIsCheck) {
            // call Api Post server (gui don len server)
            createOrderToServer(gObjectRequest);
            // ẩn modal
            $("#order-modal").modal("hide");
            // hiện bảng OrderId
            $("#div-container-order-tracking").css("display", "block");

        }

    }

    /*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/
    //function trả lại một đối tượng Choice (gói dịch vụ) được tham số 
    function getPlan(paramMenuName, paramDuongKinh, paramSuonNuong, paramSalad, paramNuocNgot, paramGIaTien) {
        var vSelectedPlanStructure = {
            kichCo: paramMenuName, // S, M, L
            duongKinh: paramDuongKinh,
            suon: paramSuonNuong,
            salad: paramSalad,
            soLuongNuoc: paramNuocNgot,
            giaTien: paramGIaTien
        }
        return vSelectedPlanStructure;
    }
    // Ham tra ve doi tuong pizza Type
    function getPizzaType(paramPizzaType) {
        var vSelectedPlan = {
            pizzaType: paramPizzaType
        }
        return vSelectedPlan;
    }
    // hàm chuyen đổi màu BTN Menu Size
    function changeColorButtonSizePizza(paramData) {
        if (paramData === "S") {
            $("#small-btn").removeClass("btn-warning").addClass("btn-success");
            $("#medium-btn").removeClass("btn-success").addClass("btn-warning");
            $("#large-btn").removeClass("btn-succes").addClass("btn-warning");
        }
        if (paramData === "M") {
            $("#small-btn").removeClass("btn-succes").addClass("btn-warning");
            $("#medium-btn").removeClass("btn-warning").addClass("btn-success");
            $("#large-btn").removeClass("btn-succes").addClass("btn-warning");
        }
        if (paramData === "L") {
            $("#small-btn").removeClass("btn-succes").addClass("btn-warning");
            $("#medium-btn").removeClass("btn-success").addClass("btn-warning");
            $("#large-btn").removeClass("btn-warning").addClass("btn-success");
        }
    }
    // hàm chuyen đổi màu BTN Menu Type
    function changeColorButtonTypePizza(paramData) {
        if (paramData === "seafood") {
            $("#btn-seafood").removeClass("btn-warning").addClass("btn-success");
            $("#btn-hawai").removeClass("btn-success").addClass("btn-warning");
            $("#btn-bacon").removeClass("btn-succes").addClass("btn-warning");
        }
        if (paramData === "hawaii") {
            $("#btn-seafood").removeClass("btn-succes").addClass("btn-warning");
            $("#btn-hawai").removeClass("btn-warning").addClass("btn-success");
            $("#btn-bacon").removeClass("btn-succes").addClass("btn-warning");
        }
        if (paramData === "baccon") {
            $("#btn-seafood").removeClass("btn-succes").addClass("btn-warning");
            $("#btn-hawai").removeClass("btn-success").addClass("btn-warning");
            $("#btn-bacon").removeClass("btn-warning").addClass("btn-success");
        }
    }
    // ham goi Api get Drink 
    function callApiGetDrinks() {
        $.ajax({
            url: "http://42.115.221.44:8080/devcamp-pizza365/drinks",
            dataType: "json",
            type: "GET",
            success: function(res) {
                // tao cac dong option tuong ung
                loadDataDrinkToSelect(res);
            },
            error: function(ajaxContext) {
                console.log(ajaxContext.responseText);
            }

        });
    }
    // ham load data to select drink
    function loadDataDrinkToSelect(paramDataDrink) {
        $.each(paramDataDrink, function(i, item) {
            $("<option/>", {
                text: paramDataDrink[i].tenNuocUong,
                value: paramDataDrink[i].maNuocUong
            }).appendTo($("#select-drink"));
        });
    }

    //// ham doc du lieu trong form ORder
    function readInfoOrderForm(paramData) {
        paramData.fullName = $("#inp-fullname").val().trim();
        paramData.email = $("#inp-email").val().trim();
        paramData.phone = $("#inp-dien-thoai").val().trim();
        paramData.address = $("#inp-dia-chi").val().trim();
        paramData.maGiamGia = $("#inp-voucher-id").val().trim();
        paramData.message = $("#inp-message").val().trim();
    }

    //Hàm kiểm tra dữ liệu khách hàng nhập vào
    function validateData(paramKhachHangData) {
        var vRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (paramKhachHangData.fullName === "") {
            alert("Bạn cần nhập đẩy đủ Họ và Tên");
            return false;
        }
        if (paramKhachHangData.email === "") {
            alert("Email không được bỏ trống");
            return false;
        }
        if (!vRegex.test(paramKhachHangData.email)) {
            alert("Email không hợp lệ !!");
            return false;
        }

        if (paramKhachHangData.phone === "") {
            alert("Số điện thoại không được bỏ trống");
            return false;
        }

        if (isNaN(paramKhachHangData.phone)) {
            alert("Số điện thoại phải là dạng số");
            return false;
        }
        if (paramKhachHangData.address === "") {
            alert("Địa chỉ không được bỏ trống");
            return false;
        }
        return true;
    }

    // ham ghi Data to Modal 
    function handlerDataToFormModal(paramUser, paramPizzaSize, paramPizzaType) {
        //goi api lay thông tin vouchẻ
        callApiGetVoucherByVoucherId(paramUser.maGiamGia);


        $("#inp-fullname-modal").val(paramUser.fullName);
        $("#inp-email-modal").val(paramUser.email);
        $("#inp-dien-thoai-modal").val(paramUser.phone);
        $("#inp-dia-chi-modal").val(paramUser.address);
        $("#inp-voucher-id-modal").val(paramUser.maGiamGia);
        $("#inp-message-modal").val(paramUser.message);
        $("#inp-message-modal").val(paramUser.message);
        $("#tarea-info-modal").val("Xác nhận: " + paramUser.fullName + " , " + paramUser.phone + " , " + paramUser.address + "\n" +
            "Menu: " + paramPizzaSize.kichCo + " ," + "Sườn Nướng: " + paramPizzaSize.suon + " , " + "Nước: " + paramPizzaSize.soLuongNuoc + " , " + "..." + "\n" +
            "Loại Pizza: " + paramPizzaType.pizzaType + " , " + "Giá: " + paramPizzaSize.giaTien + " , " + "Mã giảm giá: " + paramUser.maGiamGia + "\n" +
            "Phải thanh toán: " + (paramPizzaSize.giaTien - (paramPizzaSize.giaTien * (gVoucher.phanTramGiamGia) / 100)) + "VND " + " (giảm giá " + gVoucher.phanTramGiamGia + " % )");

    }
    // hàm gọi api lấy
    function callApiGetVoucherByVoucherId(paramVoucherId) {
        $.ajax({
            url: "http://42.115.221.44:8080/devcamp-voucher-api/voucher_detail/" + paramVoucherId,
            type: "GET",
            async: false,
            data: "json",
            success: function(res) {
                gVoucher = res;

                console.log(gVoucher);
            },
            error: function() {
                gVoucher = { phanTramGiamGia: '0' };
            }
        });
    }
    // ham đọc tất cả dữ liệu 
    function readAllRequest(paramObj) {
        paramObj.kichCo = gSelectedPizzaSizeMenu.kichCo;
        paramObj.duongKinh = gSelectedPizzaSizeMenu.duongKinh;
        paramObj.suon = gSelectedPizzaSizeMenu.suon;
        paramObj.loaiPizza = gSelectedPizzaType.pizzaType;
        paramObj.idVourcher = gInfoOrder.maGiamGia;
        paramObj.idLoaiNuocUong = $("#select-drink").val();
        paramObj.soLuongNuoc = gSelectedPizzaSizeMenu.soLuongNuoc;
        paramObj.hoTen = gInfoOrder.fullName;
        paramObj.thanhTien = gSelectedPizzaSizeMenu.giaTien;
        paramObj.email = gInfoOrder.email;
        paramObj.soDienThoai = gInfoOrder.phone;
        paramObj.diaChi = gInfoOrder.address;
        paramObj.loiNhan = gInfoOrder.message;

    }
    // ham validate tat ca du lieu Request
    function validateObjectRequest(paramObj) {
        if (paramObj.kichCo === "") {
            alert("Vui lòng chọn Size Pizza!!");
            return false;
        }
        if (paramObj.loaiPizza === "") {
            alert("Vui lòng chọn Loại Pizza!!");
            return false;
        }
        if (paramObj.idLoaiNuocUong === "NOT_SELECT_DRINK") {
            alert("Vui lòng chọn nước uống!!");
            return false;
        }
        return true;
    }
    // ham tao don len server
    function createOrderToServer(paramObj) {
        $.ajax({
            url: "http://42.115.221.44:8080/devcamp-pizza365/orders",
            type: "POST",
            data: JSON.stringify(paramObj),
            contentType: "application/json;charset=UTF-8",
            success: function(res) {
                gOrderId = res.orderId;
                // dien Orderid vao
                var vDivShowOrderId = $("#div-orderID");
                $("<p/>", {
                    text: res.orderId
                }).appendTo(vDivShowOrderId);
                console.log(gOrderId);

                alert("Đặt Hàng thành công.");
            },
            error: function(ajaxContext) {
                alert(ajaxContext.responseText);
            }
        });
    }




});
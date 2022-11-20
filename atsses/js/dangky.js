function checkValidate(frm) {
  if (frm.lastname.value.length < 1) {
    alert("Vui lòng nhập tên!!!");
    return false;
  }
  if (frm.fistname.value.length < 1) {
    alert("Vui lòng nhập họ!!!");
    return false;
  }
  if (frm.phonenumber.value.length != 10) {
    alert("Vui lòng nhập đúng số điện thoại!!!");
    return false;
  }
  if (frm.username.value.length < 4) {
    alert("Vui lòng nhập tên đăng nhập hợp lệ!!!");
    return false;
  }
  if (frm.pws.value.length < 8) {
    alert("Vui lòng nhập mật khẩu từ 8 ký tự!!!");
    return false;
  }
  if (frm.pws.value !== frm.repws.value) {
    alert("Vui lòng nhập đúng mật khẩu!!!");
    return false;
  }
  alert("Đăng ký thành công!!! Đang chuyển sang trang đăng nhập...");
  return true;
}

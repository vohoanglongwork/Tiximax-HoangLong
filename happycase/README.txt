UPDATE 11/05/2026



chạy lệnh npx playwright test --ui trên terminal
Run theo thứ tự
Vài module có thể lỗi nếu có sự thay đổi API hoặc giao diện 
=========================================================================


Happycase:
Chạy theo thứ tự 01 -> 08
01_full : Tạo đơn mua hộ và tạo phiếu thanh toán cho đơn vừa tạo
02_full : Admin chuyển trạng thái đã thanh toán cho đơn vừa tạo
03_full : Purchase tạo đơn mua hàng
04_full : Nhập kho nước ngoài
05_full : Nhập kho việt nam
06_full : Sale Xác nhận địa chỉ giao và tạo phiếu thanh toán ship
07_full : Admin xác nhận thanh toán ship
08_full : xuất kho                                                           (chưa dùng được)



=========================================================================
Sale:
taodonmuaho : Tạo đơn mua hộ nhưng không tạo phiếu thanh toán
require : no
taodondaugia : Tạo đơn đấu giá và tạo phiếu thanh toán cho đơn vừa tạo
require : no
taodondoitien : Tạo đơn đổi tiền và tạo phiếu thanh toán cho đơn vừa tạo
require : no
taodonkygui : Tạo đơn ký gửi và tạo phiếu thanh toán cho đơn vừa tạo
require : no
taokhachhang : Tạo khách hàng của sale
require : no
taoyeucauvoucher : Tạo yêu cầu voucher của sale
require : no

Huỷ đơn:
huydonchomua : Huỷ đơn trạng thái chờ mua
require : 01_full ,02_full
huydonchothanhtoantienhang : Huỷ đơn trạng thái chờ thanh toán tiền hàng
require : 01_full 
huydondaxacnhan : Huỷ đơn trạng thái đã xác nhận                             (chưa dùng được)
require : taodonmuaho 


=========================================================================



Purchase:
changepass : Đổi mật khẩu tài khoản Purchase
require : no

acceptyeucauhuy : Đồng ý yêu cầu huỷ đơn của Purchase                       (chưa dùng được)
require : 01_full, huydonchothanhtoantienhang

denyyeucauhuy : Từ chối yêu cầu huỷ đơn của Purchase                         (chưa dùng được)
require : 01_full, huydonchothanhtoantienhang

thaydoinoidungghichudonghang : Thay đổi ghi chú của đơn hàng
require : 01_full , 02_full , 03_full

themmavandon : Tạo đơn mua hàng nhưng không add mã vận đơn sau đó thêm mã trong thêm mã vận đơn
require : 01_full , 02_full



=========================================================================

Admin:

acceptvoucher : Đồng ý yêu cầu voucher
require : taoyeucauvoucher

denidevoucher : Từ chối yêu cầu voucher
require : taoyeucauvoucher

quanlydiemden : quản lý option trong cấu hình hệ thống
require : no

quanlykhuyenmai : quản lý option trong cấu hình hệ thống
require : no

quanlyloaisanpham : quản lý option trong cấu hình hệ thống
require : no

quanlywebsite : quản lý option trong cấu hình hệ thống
require : no

taotaikhoankhon : Tạo tài khoản 
taotaikhoanvn : Tạo tài khoản
taotaikhoanpurchaser : Tạo tài khoản
taotaikhoansale : Tạo tài khoản

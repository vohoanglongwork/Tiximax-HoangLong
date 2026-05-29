UPDATE 29/05/2026



CHUẨN BỊ:

-Sử dung vscode cài depencie playwright bằng lệnh npx playwright install



**Playwright Automation Test**



Yêu cầu môi trường



- Window 11

- VSCODE

- NodeJS >= 18

- npm >= 9

- Playwright



lệnh Kiểm tra version:

- node -v

- npm -v





khuyến khích sử dụng UI playwright test để hiển thị rõ ràng hơn

-Mở UI bằng 'npx playwright test --ui' vào terminal







GHI CHÚ

Run module bằng cách chuột phải vào file trên giao diện api chọn play.

Một vài module có thể lỗi nếu API hoặc giao diện thay đổi, (riêng lỗi không nhận url đúng thì chạy lại).

Các module test có require cần chạy trước để tạo dữ liệu.

Require là thứ tự các file cần chạy trước khi sử dụng file, 'No' tức là có thể chạy độc lập.




AUTOMATION TEST




=========================================================================



Happycase (Luồng chính):

Chạy theo thứ tự 01 -> 08



01_full : Tạo đơn mua hộ và tạo phiếu thanh toán cho đơn vừa tạo           

02_full : Admin chuyển trạng thái đã thanh toán cho đơn vừa tạo

03_full : Purchase tạo đơn mua hàng

04_full : Nhập kho nước ngoài                                       

05_full : Nhập kho việt nam

06_full : tạo phiếu thanh toán ship               

07_full : Admin xác nhận thanh toán ship                                 

08_full : xuất kho                 
                                                   







=========================================================================


Sale:

taodonmuaho2link: tạo đơn mua hộ có 2 link sản phẩm và tạo thanh toán
require : no

taodonmuaho2link: tạo đơn mua hộ có 2 số lượng sản phẩm 
require : no

taothanhtoansale : tạo thanh toán cho đơn hàng mới nhất của sale
require: taodonmuaho

guiyeucauhoantienvidientu : sử dung chức năng yêu cầu hoàn huỷ của sale trên đơn đấu giá
require : taodondaugia, 02_full , huydondaugia

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

huỷ đơn vào ví
huydonchomua : Huỷ đơn trạng thái chờ mua
require : 01\_full ,02\_full

huydonchothanhtoantienhang : Huỷ đơn trạng thái chờ thanh toán tiền hàng
require : 01\_full 

huydondaxacnhan : Huỷ đơn trạng thái đã xác nhận                            
huỷ đơn vào stk

huydonchomua : Huỷ đơn trạng thái chờ mua
require : 01\_full ,02\_full




=========================================================================


Purchase:
tachsoluong: Tách số lượng của đơn hang
require: taodonmuaho2soluong, taothanhtoansale , 02_full

tachdonhang: Tách đơn hàng có 2 link
require : taodonmuaho2link , 02_full

nhapkhohangthuong : nhập hang vào kho ngoại
require : 01_full , 02_full , 03_full

huydondaugia : huỷ đơn đấu giá của purchase
require : taodondaugia, 02_full

changepass : Đổi mật khẩu tài khoản Purchase
require : no

chapnhanyeucauhuy : Đồng ý yêu cầu huỷ đơn của Purchase                       
require : 01_full, huydonchothanhtoantienhang

tuchoiyeucauhuy : Từ chối yêu cầu huỷ đơn của Purchase                         
require : 01_full, huydonchothanhtoantienhang

thaydoinoidungghichudonghang : Thay đổi ghi chú của đơn hàng
require : 01_full , 02_full , 03_full

themmavandon : Tạo đơn mua hàng nhưng không add mã vận đơn sau đó thêm mã trong thêm mã vận đơn
require : 01_full , 02_full

taodonmuadaugia : tạo đơn mua cho đơn đấu giá
require : taodondaugia, 02_full

xacnhanmuadondaugia : xác nhận mua cho đơn đấu giá
require : taodondaugia, 02_full, taodonmuadaugia




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

taotaikhoankhongoai : Tạo tài khoản                             
require : no 

taotaikhoankhonoi : Tạo tài khoản
require : no

taotaikhoanpurchaser : Tạo tài khoản
require : no

taotaikhoansale : Tạo tài khoản
require : no






=========================================================================


Kho nội:


inmavandon : In mã vận đơn xuất excel
require : no

=========================================================================


Kho Ngoại:

xuatexcelchobay : xuất excel chờ bay
require : no

nhapkhohangthuong : nhập kho hang thường
require : 01_full , 02_full, 03_full


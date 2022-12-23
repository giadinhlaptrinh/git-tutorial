---
title: "Vấn đề mà chúng ta đang gặp phải"
---

![Image](./images/lessons/01-introduction/issue.png)

> Trong quá trình phát triển phần mềm, sau một thời gian, mã nguồn chương trình sẽ ngày càng nhiều. Khi muốn quay trở lại những phiên bản trước khi chỉnh sửa thì mọi người sẽ làm như thế nào?

Cách đơn giản nhất đó là sao chép lại các file hay thư mục trước khi chỉnh sửa. Khi dùng phương pháp này thì sẽ phải thường xuyên thực hiện việc tên version hoặc thêm ngày đã thay đổi vào tên file hay thư mục. Tuy nhiên, việc tự mình sao chép file hay thư mục mỗi lần chỉnh sửa thì sẽ rất vất vả, và cũng dễ xảy ra nhầm lẫn.

Hơn nữa, trường hợp đã đặt tên một cách vô trật tự như thì sẽ không thể phân biệt được file nào là bản mới nhất. Thêm nữa chúng ta cũng không thể dễ dàng biết được đã thay đổi những gì với từng version.

Ngoài ra, trường hợp làm việc trong một nhóm, nếu có hai người chỉnh sửa cùng lúc 1 file, thì sẽ xảy ra trường hợp xóa mất nội dung thay đổi của người đã chỉnh sửa trước đó.


![Image](./images/lessons/01-introduction/share-code-with-team.png)



Và để giải quyết những vấn đề này thì các hệ thống quản lý phiên bản như **Git** được tạo ra.
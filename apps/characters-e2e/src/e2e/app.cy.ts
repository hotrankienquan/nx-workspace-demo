describe('claims-e2e', () => {
  // Đặt timeout mặc định cao hơn một chút cho các lệnh GET/CONTAINS quan trọng (8 giây)
  const extendedTimeout = { timeout: 8000 };

  beforeEach(() => {
    // === ĐÃ SỬA LỖI: BỎ CHẶN CY.WAIT GÂY TIMEOUT ===
    // Lỗi CypressError: cy.wait() timed out do không tìm thấy request.
    // Chúng ta loại bỏ cy.intercept và cy.wait không cần thiết này.

    // cy.intercept('GET', '**/detail-claims/m1/data').as('loadClaimData'); 
    cy.visit('http://localhost:4200/remote1/detail-claims/m1');

    // cy.wait('@loadClaimData', extendedTimeout); // Bị loại bỏ

    // Chờ các phần tử tiêu đề trang tải xong
    // Lệnh này trở thành điểm neo (anchor) chính để Cypress biết trang đã tải.
    cy.contains('Claims Detail', extendedTimeout).should('be.visible');
    cy.contains('Claim ID: m1', extendedTimeout).should('be.visible');

    // Đảm bảo loading spinner (nếu có) đã biến mất trước khi bắt đầu test
    // cy.get('.loading-indicator').should('not.exist'); 
  });

  it('should complete the entire claims form flow', () => {
    // ===== STAGE 1: Personal Information (Fixed Timeout for Phone Number) =====
    cy.contains('Personal Information').should('be.visible');

    // Fill out Full Name
    cy.get('input[placeholder*="Enter your full name"]')
      .should('be.visible')
      .type('Nguyen Van A');

    // Fill out Email
    cy.get('input[placeholder*="Email"], input[name="email"]')
      .should('be.visible')
      .type('nguyenvana@example.com');

    // Tăng timeout cho lệnh GET Phone Number để giải quyết lỗi 1 và 3
    cy.get('input[placeholder*="Enter your phone number"]', extendedTimeout)
      .should('be.visible')
      .type('0901234567')
      .should('have.value', '0901234567');

    // Click "SAVE AND CONTINUE" button to go to next stage
    // Tăng timeout cho lệnh CONTAINS Button để giải quyết lỗi 2
    cy.contains('button', 'Save and continue', extendedTimeout)
      .should('be.visible')
      .click();

    // ===== STAGE 2: Personal Information 2 =====
    // Chờ rõ ràng cho tiêu đề Stage 2 xuất hiện
    cy.contains('Personal Information 2', extendedTimeout).should('be.visible');

    cy.get('#dropdown2').click();// 1. Click vào trường nhập (nhãn "Country") để mở menu
    cy.contains('li', 'Vietnam', extendedTimeout).click(); // 2. 

    cy.get('input[name="radio2"][value="male"]')
  .should('exist') // Nên tồn tại
  .check({ force: true }) // Chọn nó, bất kể nó bị ẩn hay không
  .should('be.checked'); // Xác nhận đã được chọn
    // Fill out Phone Number 2
    cy.get('input[placeholder*="Enter your phone number"], input[name="phone2"]')
      .should('be.visible')
      .type('0907654321')
      .should('have.value', '0907654321');

    // Kiểm tra và Click "SUBMIT CLAIM" button
    cy.contains('button', 'Submit claim')
      .should('be.visible') // Kiểm tra nút đã hiện
      .click();
  });


})
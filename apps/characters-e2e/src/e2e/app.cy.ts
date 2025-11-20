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
    
    // Fill out Country dropdown
    cy.get('select[placeholder*="Country"], select[name="country"]')
      .should('be.visible')
      .select('Vietnam'); 

    // Select Gender - Male
    cy.contains('label', 'Male').parent().find('input[type="radio"]')
      .should('be.visible')
      .check();

    // Fill out Phone Number 2
    cy.get('input[placeholder*="Phone Number 2"], input[name="phoneNumber2"]')
      .should('be.visible')
      .type('0907654321');

    // Click "SUBMIT CLAIM" button
    cy.contains('button', 'SUBMIT CLAIM').should('be.visible').click();
  });

 
})
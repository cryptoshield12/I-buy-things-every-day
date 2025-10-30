// ฟังก์ชันสำหรับจัดการการเลือกขนาดถุง (Button-like Checkboxes)
document.addEventListener('DOMContentLoaded', () => {
    const bagCheckboxes = document.querySelectorAll('.bag-checkbox');

    bagCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // ในอนาคตสามารถเพิ่มฟังก์ชันการทำงานที่ซับซ้อนขึ้นได้ที่นี่
            // เช่น การอัปเดตรายการสรุปอัตโนมัติ
            console.log(`Bag size ${this.value} ${this.checked ? 'selected' : 'deselected'}`);
        });
    });

    // ฟังก์ชันสำหรับจัดการรายการวัตถุดิบ (Checklist)
    const itemCheckboxes = document.querySelectorAll('.item-card input[type="checkbox"]');
    itemCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            console.log(`Item ${this.id} ${this.checked ? 'checked' : 'unchecked'}`);
        });
    });
});

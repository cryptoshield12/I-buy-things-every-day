// ฟังก์ชันสำหรับจัดการการเลือกขนาดถุง (Button-like Checkboxes)
document.addEventListener('DOMContentLoaded', () => {
    // ฟังก์ชันสำหรับจัดการรายการวัตถุดิบ (Checklist)
    const itemCheckboxes = document.querySelectorAll('.item-card input[type="checkbox"]');
    itemCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            console.log(`Item ${this.id} ${this.checked ? 'checked' : 'unchecked'}`);
        });
    });

    // ฟังก์ชันสำหรับจัดการการเลือกขนาดถุง (Button-like Checkboxes)
    const bagCheckboxes = document.querySelectorAll('.bag-checkbox');
    bagCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
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

    // --- ฟังก์ชันสำหรับปุ่ม ---

    // 1. ปุ่ม Reset
    const resetButton = document.getElementById('reset-button');
    resetButton.addEventListener('click', () => {
        // ยกเลิกการเลือกทั้งหมดใน Checklist
        document.querySelectorAll('.item-card input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });

        // ยกเลิกการเลือกทั้งหมดใน Bag Checkboxes
        document.querySelectorAll('.bag-checkbox').forEach(checkbox => {
            checkbox.checked = false;
        });

        // ล้างข้อมูลใน Input Field ของรายการวัตถุดิบ
        document.querySelectorAll('.item-extra-info').forEach(input => {
            input.value = '';
        });
        
        console.log('All items and bag selections have been reset.');
    });

    // 2. ปุ่ม Copy
    const copyButton = document.getElementById('copy-button');
    copyButton.addEventListener('click', () => {
        const selectedItems = [];

        // รวบรวมรายการวัตถุดิบที่ถูกเลือก
        document.querySelectorAll('.item-card input[type="checkbox"]:checked').forEach(checkbox => {
            // ดึงข้อความจาก label ที่เกี่ยวข้อง
            const label = document.querySelector(`label[for="${checkbox.id}"]`);
            // ดึงข้อมูลเพิ่มเติมจาก input field ที่เกี่ยวข้อง
            const extraInfoInput = document.querySelector(`.item-extra-info[data-item-id="${checkbox.id}"]`);
            
            if (label) {
                let itemText = label.textContent.trim();
                
                if (extraInfoInput && extraInfoInput.value.trim() !== '') {
                    itemText += ` (${extraInfoInput.value.trim()})`;
                }
                
                selectedItems.push(itemText);
            }
        });

        // รวบรวมขนาดถุงที่ถูกเลือก
        document.querySelectorAll('.bag-checkbox:checked').forEach(checkbox => {
            selectedItems.push(checkbox.value);
        });

        if (selectedItems.length === 0) {
            alert('กรุณาเลือกรายการก่อนคัดลอกค่ะ');
            return;
        }

        const listText = "รายการซื้อของ:\n" + selectedItems.join('\n');

        // คัดลอกไปยังคลิปบอร์ด
        navigator.clipboard.writeText(listText).then(() => {
            alert('คัดลอกรายการที่เลือกไปยังคลิปบอร์ดเรียบร้อยแล้วค่ะ!');
        }).catch(err => {
            console.error('Could not copy text: ', err);
            alert('ไม่สามารถคัดลอกได้ (โปรดลองคัดลอกด้วยตนเอง): ' + listText);
        });
    });
});

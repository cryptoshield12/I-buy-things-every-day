// ฟังก์ชันสำหรับจัดการการเลือกขนาดถุง (Button-like Checkboxes)
document.addEventListener('DOMContentLoaded', () => {
    // ฟังก์ชันสำหรับจัดการการแสดงผลของ Input Field ของถุง
    const bagCheckboxes = document.querySelectorAll('.bag-checkbox');

    bagCheckboxes.forEach(checkbox => {
        const extraInfoInput = document.querySelector(`.bag-extra-info[data-bag-id="${checkbox.id}"]`);
        
        // กำหนดให้ input field แสดง/ซ่อนตามสถานะ checkbox
        if (extraInfoInput) {
            extraInfoInput.style.display = checkbox.checked ? 'block' : 'none';
        }

        checkbox.addEventListener('change', function() {
            if (extraInfoInput) {
                if (this.checked) {
                    extraInfoInput.style.display = 'block';
                    extraInfoInput.focus();
                } else {
                    extraInfoInput.style.display = 'none';
                    extraInfoInput.value = ''; // ล้างข้อมูลเมื่อยกเลิกการเลือก
                }
            }
            console.log(`Bag size ${this.value} ${this.checked ? 'selected' : 'deselected'}`);
        });
    });

    // ฟังก์ชันสำหรับจัดการรายการวัตถุดิบ (Checklist)
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

        // ล้างข้อมูลและซ่อน Input Field ของถุง
        document.querySelectorAll('.bag-extra-info').forEach(input => {
            input.value = '';
            input.style.display = 'none';
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
            if (label) {
                selectedItems.push(label.textContent.trim());
            }
        });

        // รวบรวมขนาดถุงที่ถูกเลือก
        document.querySelectorAll('.bag-checkbox:checked').forEach(checkbox => {
            const extraInfoInput = document.querySelector(`.bag-extra-info[data-bag-id="${checkbox.id}"]`);
            let bagItem = checkbox.value;

            if (extraInfoInput && extraInfoInput.value.trim() !== '') {
                bagItem += ` (${extraInfoInput.value.trim()})`;
            }

            selectedItems.push(bagItem);
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

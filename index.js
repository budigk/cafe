let menus = [
  {
    id: '001',
    nama: 'Nasi Goreng Setan',
    harga: '45000',
    image: 'images/nasi.jpg',
  },
  {
    id: '002',
    nama: 'Mie Goreng Ala Mamak',
    harga: '42000',
    image: 'images/mie.jpg'
  },
  {
    id: '003',
    nama: 'Kwetiau Goreng Antri',
    harga: '42000',
    image: 'images/kwetiau.jpg'
  },
  {
    id: '004',
    nama: 'Bihun Goreng Hongkong',
    harga: '40000',
    image: 'images/bihun.jpg'
  },
  {
    id: '005',
    nama: 'Sate Ayam Lecker',
    harga: '25000',
    image: 'images/sate.jpg'
  },
  {
    id: '006',
    nama: 'Spicy French Fries',
    harga: '12000',
    image: 'images/kentang.jpg'
  },
  {
    id: '007',
    nama: 'Spaghetti Poll Pedas',
    harga: '55000',
    image: 'images/spaghetti.jpg'
  },
  {
    id: '008',
    nama: 'Pizza Pepperoni',
    harga: '85000',
    image: 'images/pizza.jpg'
  },
  {
    id: '009',
    nama: 'Es Degan Nikmat',
    harga: '25000',
    image: 'images/degan.jpg'
  },
  {
    id: '010',
    nama: 'Es Mojito',
    harga: '35000',
    image: 'images/mojito.jpg'
  },
  {
    id: '011',
    nama: 'Kopi Gula Aren',
    harga: '25000',
    image: 'images/kopi.jpg'
  },
  {
    id: '012',
    nama: 'Teh Pilihan',
    harga: '25000',
    image: 'images/teh.jpg'
  },
];

function generateTableMenu(table, data) {
  let iCol = 1;
  let row;
  for (let element of data) {
      if (iCol == 1){
        row = table.insertRow();
      }

      let cell = row.insertCell();

      const image = document.createElement('img')
      image.src  = element.image
      image.alt = "Foto Menu Makanan"
      image.width = 250
      image.id = element.id
      cell.id = element.id
      cell.appendChild(image)

      let nf = new Intl.NumberFormat();

      let text = document.createTextNode(element.nama+ " [ " + nf.format(element.harga) + " ]");
      text.id = element.id;
      cell.appendChild(text);

      iCol += 1;

      if (iCol == 5){
        iCol = 1;
      }
  }

  for (var i = 0; i < table.rows.length; i++) {
      for (var j = 0; j < table.rows[i].cells.length; j++)
      table.rows[i].cells[j].onclick = function () {
          menuClick(this);
      };
  }
}

function generateTablePesanan(table, data) {
    //Remove All Rows
    
    while(table.hasChildNodes())
    {
      table.removeChild(table.firstChild);
    }

    //Create Judul
    let rowJudul;
    rowJudul = table.insertRow();

    let cellNo = rowJudul.insertCell();
    let no = document.createTextNode("No");
    cellNo.id = "judul";
    cellNo.appendChild(no);  

    let cellNama = rowJudul.insertCell();
    let nama = document.createTextNode("Nama");
    cellNama.id = "judul"
    cellNama.appendChild(nama);  

    let cellQty = rowJudul.insertCell();
    let qty = document.createTextNode("Qty");
    cellQty.id = 'judul'
    cellQty.appendChild(qty);  

    let cellJumlah = rowJudul.insertCell();
    let jumlah = document.createTextNode("Jumlah");
    cellJumlah.id = "judul"
    cellJumlah.appendChild(jumlah);  
    
    //Create Isi
    let iNo = 1;
    let row;
    let total = 0;
    let nf = new Intl.NumberFormat();

    for (let element in data) {
        row = table.insertRow();
  
        let cellNo = row.insertCell();
        let no = document.createTextNode(iNo);
        cellNo.appendChild(no);  

        let cellNama = row.insertCell();
        let nama = document.createTextNode(data[element].nama);
        cellNama.id = "namaBarang"
        cellNama.appendChild(nama);  

        let cellQty = row.insertCell();
        let qty = document.createTextNode(data[element].qty);
        cellQty.appendChild(qty);  

        let cellJumlah = row.insertCell();
        let jumlah = document.createTextNode(nf.format(data[element].qty * data[element].harga));
        cellJumlah.id = "jumlah"
        cellJumlah.appendChild(jumlah);  

        total += data[element].qty * data[element].harga;
        iNo += 1;
    }

    row = table.insertRow();
    let cellTotal = row.insertCell();
    let totalNode = document.createTextNode("TOTAL : " + nf.format(total));
    cellTotal.colSpan = 4;
    cellTotal.id = "total";
    cellTotal.appendChild(totalNode);  
}

function menuClick(tableCell) {
  alert("Pesanan Anda Telah Tersimpan")
  objMenu = arrayToObject(menus);

  if (pesanan[tableCell.id] == undefined){
    pesanan[tableCell.id] = {nama: objMenu[tableCell.id].nama, harga: objMenu[tableCell.id].harga, qty: 0};
  }
  
  pesanan[tableCell.id].qty += 1; 

  let tabelPesanan = document.getElementById("tabelPesanan")
  generateTablePesanan(tabelPesanan, pesanan)
}

function arrayToObject(array){
  let output = {};

  for (let i = 0; i < array.length; i++){
    output[array[i].id] = {nama: array[i].nama, harga: array[i].harga}
  }

  return output;
}

let pesanan = {};
let tabelMenu = document.getElementById("tabelMenu")
generateTableMenu(tabelMenu, menus)
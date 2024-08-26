'use client'

import { cn } from '@/lib/utils'
import { useModal } from '@/store/use-modal-store'
import { useParams } from 'next/navigation'

export const RuleModal = () => {
  const { isOpen, onClose, type } = useModal()

  const params = useParams()

  const isModalOpen = isOpen && type === 'rule'

  return (
    <div
      className={cn('modal', isModalOpen && 'show')}
      id={params?.tableId && 'modal_rule'}
    >
      <div className="modal_dark modal_close" onClick={onClose}></div>
      <div className="modal_dialog sz-lg">
        <div className="modal_content">
          <div className="modal_head">
            Дүрэм
            <div className="btn_close modal_close" onClick={onClose}>
              <span className="icon sz-24">
                <i className="icon_close"></i>
              </span>
            </div>
          </div>
          <div className="modal_body">
            <div className="scrollbar">
              <h3 className="ttl color-primary text-up">
                {' '}
                <span>Эхлэл таблицын тохиргоо</span>
              </h3>
              <div className="text">
                <p>- Тоглогчдын тоо: 2-оос 10 хүртэл</p>
                <p>
                  - Диллерийг сонгож, диллерийн картыг энэ хүний өмнө тавина. Шударга
                  байдлыг хангах үүднээс тус бүр тоглоом дууссаны дараа диллерийн байрлал
                  цагийн зүүний дагуу зүүн талд байгаа хүнд шилжүүлнэ. Ингэснээр бүх
                  тоглогч дараалан диллер болдог.
                </p>
                <p>
                  - Диллер нь цагийн зүүний дагуу картыг тарааж, тоглогч бүр хоёр карт
                  дэвсэж харуулна.
                </p>
              </div>
              <br />
              <h3 className="ttl color-primary text-up">
                <span>Покер тоглоомын тойм</span>
              </h3>
              <div className="text">
                <p>
                  - Покер тоглоом нь 4 үе шаттай бооцооны дугааруудыг агуулдаг:
                  <strong className="color-main">
                    Fre Flop, Flop, Turn, River.
                  </strong>
                </p>
                <p>
                  - Үе шат бүрийн бооцооны дууссаны дараа бүх бооцоо нэг газар
                  цугларна. <strong className="color-main">Pot.</strong> Тоглогч бүрийн
                  бооцоо адил, хэн ч дахин өргөхгүй бол бооцооны үе шат дууссан гэж үзнэ.
                </p>
                <p>
                  - 4 үе шат тоглоомын дараа хамгийн хүчтэй гар бүхий тоглогч ялагч болно.
                  Гэсэн хэдий ч бодит гараа хаана ч дуусах боломжтой. Хэн нэгэн өргөхөд
                  бусад бүх тоглогчид fold хийхэд өргөсөн хүн ялагч болж, тоглоом
                  дуусна.
                </p>
                <p>
                  - Ялагч нь бүх тоглогчдын нийт бооцоог ялна. <strong className="color-main">pot.</strong> Ялагч
                  бусад хүнээс илүү хурдан бүх мөнгийг бооцоонд оруулсан бол{' '}
                  <strong className="color-main">(all-in)</strong> үед л pot-д байгаа
                  мөнгийг авах боломжтой.
                </p>
              </div>
              <br />
              <h3 className="ttl color-primary text-up">
                {' '}
                <span>Эхний үе шатны үйлдэл</span>
              </h3>
              <div className="text">
                Тоглогч бүрт дараах үйлдлүүдийг хийх эрхтэй:
              </div>
              <br />
              <h4 className="color-main fw-700">Карт тавих (Fold)</h4>
              <div className="text">
                <p>
                  Тоглогч тоглоомоос гарах ба дараагийн тоглоомыг хүлээнэ. Энэ үйлдэл нь
                  тоглогчийн ялах боломжгүй муу карт авсан эсвэл тоглогч бусдад илүү
                  мөнгө төлөхийг хүсэхгүй байгаа үед тохиолддог. Урьдчилсан бооцоог
                  алдана.
                </p>
              </div>
              <br />
              <h4 className="color-main fw-700">Мөрдөх (Call)</h4>
              <div className="text">
                Өмнөх тоглогчийн тавьсан бооцооны хэмжээгээ тэнцүү мөнгөөр бооцоолно.
              </div>
              <br />
              <h4 className="color-main fw-700">Бооцоолох (Bet)</h4>
              <div className="text">
                Хэрвээ хэн ч бооцоолохгүй байсан үед бооцоолно. Ингэснээр тоглоомыг
                үргэлжлүүлэхийг хүссэн бусад тоглогчид дор хаяж бооцооны хэмжээг
                төлөх ёстой. (Call) эсвэл түүнээс ихийг тавих (Raise) эсвэл
                fold хийх.
              </div>
              <br />
              <h4 className="color-main fw-700">Өргөх (Raise)</h4>
              <div className="text">
                <p>
                  Хэн нэгэн бооцоолсны дараа нэмэлт бооцоог өргөх шийдвэрийг
                  авна.
                </p>
                <p>
                  Жишээлбэл: Эхэнд нь хоёр тоглогч A ба B тус бүр 250 тавьсан бөгөөд
                  нийт дүн нь 500 байна. Тоглогч A нь нэмэлт 250 өргөхөөр шийдсэн. Ингэснээр
                  нийт дүн нь 750 болно. Одоо тоглогч B нь 3 сонголттой: call хийж 250
                  нэмэх, тоглогч A-г өргөх, эсвэл илүү их өргөх (жишээ нь 350) эсвэл
                  fold хийх.
                </p>
              </div>
              <br />
              <h4 className="color-main fw-700">Бүгд (All-in)</h4>
              <div className="text">
                Мөнгөө бүрэн бооцоод тоглохыг all-in гэж нэрлэдэг. Бүгдийг цуглуулж
                тоглоом үргэлжилнэ, та тав тухтай сууж ажиглах болно. Тоглоом дууссаны
                дараа картууд ил болно, ялагч болон ялагдагчийг тодорхойлно. Хэрвээ та
                ялагч болбол та бүгдийг call хийсэн хэмжээнд pot-д байгаа мөнгийг
                л авах болно.
              </div>
              <br />
              <h4 className="color-main fw-700">Шалгах (Check)</h4>
              <div className="text">
                Хэн ч бооцоолохгүй үед бооцоогүйгээр бусдын үйлдлийг хүлээнэ.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
